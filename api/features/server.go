package features

import (
    "fmt"
    "log"
    "time"
    "strings"
    "math/rand"
    "encoding/json"
    "encoding/base64"
    "database/sql"
    "net/http"
    "crypto/sha256"
    "github.com/dgrijalva/jwt-go"
    _ "github.com/lib/pq"
)

var charset62 = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

var seededRand *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))

var jwtKey = []byte(RandomString(512))

func RandomString(length int) string {
    randomString := make([]rune, length)
    for i := range randomString {
        randomString[i] = charset62[rand.Intn(len(charset62))]
    }
    return string(randomString)
}

type UserAuth struct {
    Name  string
    Password  string
}

type Claims struct {
    Name string
    jwt.StandardClaims
}

type Server struct {
    Db *sql.DB
}

func (s *Server) HandleSignUp(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodPost {
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
        } else {
            expirationTime := time.Now().Add(672 * time.Hour)
            claims := &Claims{
                Name: user.Name,
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
            w.Header().Set("Content-Type", "application/json")
            response := make(map[string]string)
            response["userName"] = user.Name;
            response["haveMessagesBeenRead"] = "0";
            jsonResponse, err := json.Marshal(response)
            if err != nil {
                log.Fatalf("Error happened in JSON marshal. Err: %s", err)
            }
            w.Write(jsonResponse)
        }
    } else {
        w.WriteHeader(http.StatusBadRequest)
    }
}

func (s *Server) HandleSignIn(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodPost {
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
        queryToGetPassword := fmt.Sprintf("SELECT password_hash FROM users WHERE name='%s'", user.Name)
        rows, queryError := s.Db.Query(queryToGetPassword)
        defer rows.Close()
        if queryError != nil {
            log.Println("[ERROR]", queryError)
            w.WriteHeader(http.StatusBadRequest)
            return
        }
        var queryResult string
        for rows.Next() {
            if err := rows.Scan(&queryResult); err != nil {
                log.Fatal(err)
                return
            }
        }
        var correctPasswordHashURLSafe = strings.TrimRight(queryResult, " ")
        if passwordHashURLSafe != correctPasswordHashURLSafe {
            w.WriteHeader(http.StatusUnauthorized)
            return
        }
        expirationTime := time.Now().Add(672 * time.Hour)
        claims := &Claims{
            Name: user.Name,
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
        w.Header().Set("Content-Type", "application/json")
        response := make(map[string]string)
        response["userName"] = claims.Name;
        response["haveMessagesBeenRead"] = "0";
        jsonResponse, err := json.Marshal(response)
        if err != nil {
            log.Fatalf("Error happened in JSON marshal. Err: %s", err)
        }
        w.Write(jsonResponse)
    } else {
        w.WriteHeader(http.StatusBadRequest)
    }
}

func (s *Server) FetchUserState(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodGet {
        c, err := r.Cookie("token")
        if err != nil {
            if err == http.ErrNoCookie {
                w.WriteHeader(http.StatusUnauthorized)
                return
            }
            w.WriteHeader(http.StatusBadRequest)
            return
        }

        tknStr := c.Value
        claims := &Claims{}
        tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
            return jwtKey, nil
        })
        if err != nil {
            if err == jwt.ErrSignatureInvalid {
                w.WriteHeader(http.StatusUnauthorized)
                return
            }
            w.WriteHeader(http.StatusBadRequest)
            return
        }
        if !tkn.Valid {
            w.WriteHeader(http.StatusUnauthorized)
            return
        }
        queryToGetHaveMessagesBeenRead := fmt.Sprintf("SELECT have_messages_been_read FROM users WHERE name='%s'", claims.Name)
        rows, queryError := s.Db.Query(queryToGetHaveMessagesBeenRead)
        defer rows.Close()
        if queryError != nil {
            log.Println("[ERROR]", queryError)
            w.WriteHeader(http.StatusBadRequest)
            return
        }
        var queryResult string
        for rows.Next() {
            if err := rows.Scan(&queryResult); err != nil {
                log.Fatal(err)
                return
            }
        }
        var haveMessagesBeenRead = strings.TrimRight(queryResult, " ")
        w.Header().Set("Content-Type", "application/json")
        response := make(map[string]string)
        response["userName"] = claims.Name;
        response["haveMessagesBeenRead"] = haveMessagesBeenRead;
        jsonResponse, err := json.Marshal(response)
        if err != nil {
            log.Fatalf("Error happened in JSON marshal. Err: %s", err)
        }
        w.Write(jsonResponse)
    } else {
        w.WriteHeader(http.StatusBadRequest)
    }
}
