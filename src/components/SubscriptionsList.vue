<template>
    <div class="app">
        <Navbar />
        <div class="list-container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <h3 class="text-center">Subscriptions List</h3>
                    <table class="table table-striped align-middle">
                        <thead>
                            <tr>
                                <th>Subscription</th>
                                <th class="d-none d-sm-table-cell">Description</th>
                                <th>Amount</th>
                                <th>Frequency</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="subscription in Subscriptions" :key="subscription.key">
                                <td>{{ subscription.name }}</td>
                                <td class="d-none d-sm-table-cell">{{ subscription.description }}</td>
                                <td>${{ subscription.amount }}</td>
                                <td>{{ subscription.frequency }}</td>
                                <td>
                                    <router-link :to="{ name: 'edit', params: { id: subscription.key } }"
                                        class="btn btn-primary btn-sm">
                                        Edit
                                    </router-link>
                                    <button @click.prevent="deleteSubscription(subscription.key)"
                                        class="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button @click="createSubscription" class="btn btn-success btn-add mt-3">
                        Add New Subscription
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../firebaseDB';
import Navbar from './Navbar.vue';

export default {
    name: "List-vue",
    components: {
        Navbar
    },
    data() {
        return {
            Subscriptions: [],
        };
    },
    created() {
        db.collection('subscriptions').onSnapshot((snapshotChange) => {
            this.Subscriptions = [];
            snapshotChange.forEach((doc) => {
                if (doc.data().name) {
                    this.Subscriptions.push({
                        key: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        amount: doc.data().amount,
                        frequency: doc.data().frequency,
                    });
                }
            });
        });
    },
    methods: {
        deleteSubscription(id) {
            if (window.confirm('Do you really want to delete?')) {
                db.collection('subscriptions').doc(id).delete()
                    .then(() => { })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        createSubscription() {
            this.$router.push('/create');
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

.list-container {
    margin-top: 50px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
}

h3 {
    color: #2C3D4E;
    margin-bottom: 20px;
}

.table {
    width: 100%;
    margin-top: 15px;
    border-collapse: separate;
    border-spacing: 0;
}

.table thead {
    background-color: #42B883;
    color: #fff;
}

.table th,
.table td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    text-align: center;
}

.table tbody tr:hover {
    background-color: #f2f2f2;
}

.btn {
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-danger {
    background-color: #dc3545;
    color: #fff;
}

.btn-danger:hover {
    background-color: #b02a37;
}

.btn-success {
    background-color: #28a745;
    color: #fff;
}

.btn-success:hover {
    background-color: #218838;
}

.btn-add {
    display: block;
    margin: 20px auto;
    width: auto;
    padding: 10px 20px;
}
</style>


