//mysql이 설치되어 있어서 3306 -> 3307port 사용
const config = {
    development : {
        username : "root",
        password : "kt1079616",
        database : "comboardtest",
        host : "localhost",
        dialect : "mysql",
        operatorsAliases : false
    }
    
}

export default config;