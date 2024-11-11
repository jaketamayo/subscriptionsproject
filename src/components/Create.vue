<template>
    <div class="app">
        <Navbar />
        <div class="add-subscription-container">
            <form @submit.prevent="addSubscription" class="subscription-form">
                <h3>Add Subscription</h3>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" class="form-control" v-model="subscription.name" required />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" id="description" class="form-control" v-model="subscription.description"
                        required />
                </div>

                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input type="text" id="amount" class="form-control" v-model="subscription.amount" required />
                </div>

                <div class="form-group">
                    <label for="frequency">Payment Frequency</label>
                    <select id="frequency" class="form-control" v-model="subscription.frequency" required>
                        <option value="weekly">Weekly</option>
                        <option value="bimonthly">Bi-monthly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="biannually">Bi-annually</option>
                        <option value="annually">Annually</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="yearStarted">Year Started</label>
                    <input type="number" id="yearStarted" class="form-control" v-model="subscription.yearStarted"
                        required />
                </div>

                <div class="button-group">
                    <button type="submit" class="btn btn-primary">Add Subscription</button>
                    <button type="button" class="btn btn-secondary" @click="cancelOperation">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '../firebaseDB';
import Navbar from '../components/Navbar.vue';

export default {
    name: 'Create',
    components: {
        Navbar,
    },
    data() {
        return {
            subscription: {
                name: '',
                description: '',
                amount: '',
                frequency: '',
                yearStarted: '', // New field for year started
            },
            error: false,
            errorMsg: "",
        };
    },
    methods: {
        addSubscription() {
            if (this.subscription.name && this.subscription.description) {
                db.collection('subscriptions').add(this.subscription)
                    .then(() => {
                        this.resetForm();
                        this.$router.push('/subscriptionsList');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.showError("Please fill out the subscription name and description");
            }
        },
        resetForm() {
            this.subscription = {
                name: '',
                description: '',
                amount: '',
                frequency: '',
                yearStarted: '' // Reset the new field as well
            };
        },
        showError(message) {
            this.error = true;
            this.errorMsg = message;
            setTimeout(() => {
                this.error = false;
            }, 5000);
        },
        cancelOperation() {
            this.$router.push('/subscriptionsList');
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

.add-subscription-container {
    margin-top: 50px;
    padding: 30px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

.subscription-form {
    display: flex;
    flex-direction: column;
}

h3 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
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
    font-size: 14px;
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
    margin-top: 15px;
}

.btn {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 48%;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
    color: #fff;
}

.btn-secondary:hover {
    background-color: #5a6268;
}
</style>

