const getUsers="SELECT * FROM users"
const getUsersGetbyId="SELECT * FROM users WHERE id =$1"
const addUser="INSERT INTO users (name, surname, job) VALUES ($1, $2, $3)"
const removeUser="DELETE FROM users WHERE id =$1"
const updateUser="UPDATE users SET name = $1, surname = $2, job=$3 WHERE id =$4"

module.exports = {
    getUsers,
    getUsersGetbyId,
    addUser,
    removeUser,
    updateUser
}