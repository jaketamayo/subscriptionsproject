<template>
    <div class="app">
        <Navbar />
        <div class="login-container">
            <form @submit.prevent="login" class="login-form">
                <h2>Login</h2>
                <div class="form-group">
                    <label for="email">Username:</label>
                    <input type="email" id="email" class="form-control" placeholder="Email address..." v-model="email"
                        required />
                </div>
                <div class="form-group">
                    <label for="pw">Password:</label>
                    <input id="pw" type="password" class="form-control" placeholder="Password..." v-model="password"
                        required />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Navbar from '../components/Navbar.vue';

export default {
    name: 'Login',
    components: {
        Navbar,
    },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            firebase.auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push('/subscriptionsList');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>

<style scoped>
.app {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-container {
    margin-top: 50px;
    padding: 30px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

.login-form {
    display: flex;
    flex-direction: column;
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    color: #555;
    margin-bottom: 5px;
}

.form-control {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
}

.form-control:focus {
    border-color: #42b883;
    outline: none;
}

.btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    background-color: #42b883;
    color: #fff;
    margin-top: 10px;
    width: 100%;
}

.btn:hover {
    background-color: #369e6f;
}
</style>
