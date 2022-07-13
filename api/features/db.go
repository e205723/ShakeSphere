package features

import (
    "fmt"
    "log"
    "encoding/json"
    "encoding/base64"
    "database/sql"
    "net/http"
    "crypto/sha256"
    _ "github.com/lib/pq"
)

type User struct {
    Name  string
    Password  string
}

type Server struct {
    Db *sql.DB
}

func (s *Server) HandleGet(w http.ResponseWriter, r *http.Request) {
    query := "SELECT id, name FROM users"
    rows, err := s.Db.Query(query)
    if err != nil {
        log.Println("[ERROR]", err)
        w.WriteHeader(http.StatusBadRequest)
        w.Write([]byte("bad"))
    } else {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("ok"))
    }
    defer rows.Close()
    for rows.Next() {
        var (
            id int
            name string
        )
        if err := rows.Scan(&id, &name); err != nil {
            log.Fatal(err)
        }
        log.Printf("id: '%d'\n user: %s\n\n", id, name)
    }
}

func (s *Server) HandlePost(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodPost {
        var user User
        decoder := json.NewDecoder(r.Body)
        decodeError := decoder.Decode(&user)
        if decodeError != nil {
            log.Println("[ERROR]", decodeError)
        }
        passwordHash32Byte := sha256.Sum256([]byte(user.Password))
        passwordHashURLSafe := base64.URLEncoding.EncodeToString(passwordHash32Byte[:])
        query := fmt.Sprintf("INSERT INTO users (name, password_hash) VALUES ('%s', '%s')", user.Name, passwordHashURLSafe)
        _, queryRrror := s.Db.Exec(query)
        if queryRrror != nil {
            log.Println("[ERROR]", queryRrror)
            w.WriteHeader(http.StatusBadRequest)
            w.Write([]byte("bad"))
        } else {
            w.WriteHeader(http.StatusOK)
            w.Write([]byte("ok"))
        }
    } else {
        w.WriteHeader(http.StatusBadRequest)
        w.Write([]byte("bad"))
    }
}
