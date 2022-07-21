package features

import (
    "fmt"
    "log"
    "time"
    "strings"
    "net/http"
    "io/ioutil"
    "math/rand"
    "database/sql"
    "encoding/json"
    "crypto/sha256"
    "encoding/base64"
    _ "github.com/lib/pq"
    "github.com/dgrijalva/jwt-go"
)

var charset62 = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

var seededRand *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))

var jwtKey = []byte(RandomString(511))

func RandomString(length int) string {
    randomString := make([]rune, length)
    for i := range randomString {
        randomString[i] = charset62[rand.Intn(len(charset62))]
    }
    return string(randomString)
}

type Server struct {
    Db *sql.DB
}

type UserAuth struct {
    Name  string
    Password  string
}

type Claims struct {
    Name string
    jwt.StandardClaims
}

type UserState struct {
    UserName string `json:"userName"`
    HaveMessagesBeenRead bool `json:"haveMessagesBeenRead"`
}

func SetJwtInCookie (w http.ResponseWriter, userName string) {
    expirationTime := time.Now().Add(672 * time.Hour)
    claims := &Claims{
        Name: userName,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expirationTime.Unix(),
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        return
    }
    cookie := &http.Cookie{
        Name: "token",
        Value: tokenString,
        Expires: expirationTime,
    }
    http.SetCookie(w, cookie)
}

func LoadClaimsFromJwt (w http.ResponseWriter, r *http.Request) (*Claims) {
    c, err := r.Cookie("token")
    if err != nil {
        if err == http.ErrNoCookie {
            w.WriteHeader(http.StatusUnauthorized)
            return &Claims{}
        }
        w.WriteHeader(http.StatusBadRequest)
        return &Claims{}
    }

    tknStr := c.Value
    claims := &Claims{}
    tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })
    if err != nil {
        if err == jwt.ErrSignatureInvalid {
            w.WriteHeader(http.StatusUnauthorized)
            return &Claims{}
        }
        w.WriteHeader(http.StatusBadRequest)
        return &Claims{}
    }
    if !tkn.Valid {
        w.WriteHeader(http.StatusUnauthorized)
        return &Claims{}
    }
    return claims
}

func (s *Server) SignUp(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        w.WriteHeader(http.StatusBadRequest)
    }
    var user UserAuth
    decoder := json.NewDecoder(r.Body)
    decodeError := decoder.Decode(&user)
    if decodeError != nil {
        log.Println("[ERROR]", decodeError)
    }
    passwordHash32Byte := sha256.Sum256([]byte(user.Password))
    passwordHashURLSafe := base64.URLEncoding.EncodeToString(passwordHash32Byte[:])
    queryToReGisterUser := fmt.Sprintf("INSERT INTO users (name, password_hash) VALUES ('%s', '%s')", user.Name, passwordHashURLSafe)
    _, queryRrror := s.Db.Exec(queryToReGisterUser)
    if queryRrror != nil {
        log.Println("[ERROR]", queryRrror)
        w.WriteHeader(http.StatusBadRequest)
    }
    SetJwtInCookie(w, user.Name)
    w.Header().Set("Content-Type", "application/json")
    response := UserState{
        UserName: user.Name,
        HaveMessagesBeenRead: false,
    }
    jsonResponse, err := json.Marshal(response)
    if err != nil {
        log.Fatalf("Error happened in JSON marshal. Err: %s", err)
    }
    w.Write(jsonResponse)
}

func (s *Server) SignIn(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        w.WriteHeader(http.StatusBadRequest)
    }
    var user UserAuth
    decoder := json.NewDecoder(r.Body)
    decodeError := decoder.Decode(&user)
    if decodeError != nil {
        log.Println("[ERROR]", decodeError)
        w.WriteHeader(http.StatusBadRequest)
        return
    }
    passwordHash32Byte := sha256.Sum256([]byte(user.Password))
    passwordHashURLSafe := base64.URLEncoding.EncodeToString(passwordHash32Byte[:])
    query := fmt.Sprintf("SELECT password_hash, have_messages_been_read FROM users WHERE name='%s'", user.Name)
    var correctPasswordHashURLSafe string
    var haveMessagesBeenRead bool
    if queryError := s.Db.QueryRow(query).Scan(&correctPasswordHashURLSafe, &haveMessagesBeenRead); queryError != nil {
        log.Println("[ERROR]", queryError)
        w.WriteHeader(http.StatusBadRequest)
        return
    }
    correctPasswordHashURLSafe = strings.TrimRight(correctPasswordHashURLSafe, " ")
    if passwordHashURLSafe != correctPasswordHashURLSafe {
        w.WriteHeader(http.StatusUnauthorized)
        return
    }
    SetJwtInCookie(w, user.Name)
    w.Header().Set("Content-Type", "application/json")
    response := UserState{
        UserName: user.Name,
        HaveMessagesBeenRead: haveMessagesBeenRead,
    }
    jsonResponse, err := json.Marshal(response)
    if err != nil {
        log.Fatalf("Error happened in JSON marshal. Err: %s", err)
    }
    w.Write(jsonResponse)
}

func (s *Server) FetchUserState(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        w.WriteHeader(http.StatusBadRequest)
    }
    claims := LoadClaimsFromJwt(w, r)
    if (claims.Name == "") {
        return
    }
    queryToGetHaveMessagesBeenRead := fmt.Sprintf("SELECT have_messages_been_read FROM users WHERE name='%s'", claims.Name)
    var haveMessagesBeenRead bool
    if queryError := s.Db.QueryRow(queryToGetHaveMessagesBeenRead).Scan(&haveMessagesBeenRead); queryError != nil {
        log.Println("[ERROR]", queryError)
        w.WriteHeader(http.StatusBadRequest)
        return
    }
    w.Header().Set("Content-Type", "application/json")
    response := UserState{
        UserName: claims.Name,
        HaveMessagesBeenRead: haveMessagesBeenRead,
    }
    jsonResponse, err := json.Marshal(response)
    if err != nil {
        log.Fatalf("Error happened in JSON marshal. Err: %s", err)
    }
    w.Write(jsonResponse)
}

func (s *Server) FetchMessages(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        w.WriteHeader(http.StatusBadRequest)
    }
    claims := LoadClaimsFromJwt(w, r)
    if (claims.Name == "") {
        return
    }
    queryToGetCurrentMessageJsonFilePath := fmt.Sprintf("SELECT json_file_path FROM messages INNER JOIN users ON messages.id = users.current_message_id WHERE users.name='%s'", claims.Name)
    var currentMessageJsonFilePath string
    if queryError := s.Db.QueryRow(queryToGetCurrentMessageJsonFilePath).Scan(&currentMessageJsonFilePath); queryError != nil {
        log.Println("[ERROR]", queryError)
        w.WriteHeader(http.StatusBadRequest)
        return
    }
    currentMessageJsonFilePath = strings.TrimRight(currentMessageJsonFilePath, " ")
    jsonResponse, err := ioutil.ReadFile(currentMessageJsonFilePath)
    if err != nil {
        fmt.Println("[ERROR]", err)
    }
    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonResponse)
}

func (s *Server) MarkMessagesAsRead(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        w.WriteHeader(http.StatusBadRequest)
    }
    claims := LoadClaimsFromJwt(w, r)
    if (claims.Name == "") {
        return
    }
    queryToUpdateHaveMessagesBeenRead := fmt.Sprintf("UPDATE users SET have_messages_been_read = TRUE WHERE name='%s'", claims.Name)
    _, queryRrror := s.Db.Exec(queryToUpdateHaveMessagesBeenRead)
    if queryRrror != nil {
        log.Println("[ERROR]", queryRrror)
        w.WriteHeader(http.StatusBadRequest)
    }
}
