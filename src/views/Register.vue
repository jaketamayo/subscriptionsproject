<template>
    <div class="app">
        <Navbar />
        <div class="register-container">
            <form @submit.prevent="register" class="register-form">
                <h2>Register</h2>
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
                <div class="button-group">
                    <button type="submit" class="btn btn-primary">Register</button>
                    <button @click="cancelOperation" class="btn btn-secondary">Back to Login</button>
                </div>
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
        register() {
            firebase.auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully registered! Please login.');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        cancelOperation() {
            this.$router.push('/');
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

.register-container {
    margin-top: 50px;
    padding: 30px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

.register-form {
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

.button-group {
    display: flex;
    justify-content: space-between;
}

.btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.btn-primary {
    background-color: #42b883;
    color: #fff;
}

.btn-primary:hover {
    background-color: #369e6f;
}

.btn-secondary {
    background-color: #ddd;
    color: #333;
}

.btn-secondary:hover {
    background-color: #bbb;
}
</style>
