<template>
    <header class="header">
        <h2 class="logo">
            My <br />
            Hometask
        </h2>
        <div :class="{ overlay: isMenuOpen }" @click.self="menu()"></div>
        <div class="header__menu" :class="{ 'active-menu': isMenuOpen }">
            <nav class="header__nav">
                <ul class="header__list">
                    <li><button class="btn" v-if="$route.name !== 'home'"
                            @click="$router.push({ name: 'home' })">Главная</button></li>
                    <li><button class="btn" v-if="$route.name !== 'blog'"
                            @click="$router.push({ name: 'blog' })">Блог</button></li>
                    <li><button class="btn" v-if="$route.name !== 'materials'"
                            @click="$router.push({ name: 'materials' })">Материалы</button></li>
                </ul>
            </nav>
            <div v-if="authStore.user.isAuth" class="header__logout">
                <button class="header__logout-btn btn" @click="logout()">
                    Выйти
                </button>
            </div>
        </div>
        <div class="burger" :class="{ 'active-burger': isMenuOpen }" @click="menu()">
            <span></span>
        </div>
        <transition name="opacity">
            <div v-if="authStore.user.isAuth" class="header__dashboard">
                <router-link :to="{ name: authStore.user.isAdmin ? 'admin' : 'dashboard' }"
                    class="header__dashboard-btn"><img class="header__dashboard-img" src="/assets/images/user.svg"
                        alt="" /></router-link>
            </div>
            <div v-else class="header__login">
                <button class="header__login-btn" @click="loginOpen()">
                    <img class="header__login-img" src="/assets/images/door-open.svg" alt="" />
                </button>
            </div>
        </transition>
        <transition name="opacity">
            <LoginComponent v-if="isLoginOpen" :isLoginOpen="isLoginOpen" @closeLogin="loginOpen()" />
        </transition>
    </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOnWindowResize } from "../composables/windowResize";
import { useBodyOverflowHidden } from "../composables/bodyOverflowHidden";
import { useAuthStore } from '../stores/authStore';
import { useRouter } from "vue-router";
import LoginComponent from '../components/LoginComponent.vue';
import axios from "axios";

const isMenuOpen = ref<boolean>(false);
const isLoginOpen = ref<boolean>(false);
const authStore = useAuthStore();
const router = useRouter();

useOnWindowResize(isMenuOpen, () => menu());

function menu() {
    isMenuOpen.value = !isMenuOpen.value;
    useBodyOverflowHidden();
}

function loginOpen() {
    isLoginOpen.value = !isLoginOpen.value;
}

function logout() {
    axios.post('/logout').then(() => {
        const userLocalStorage = localStorage.getItem('user');
        const authStore = useAuthStore();
        if (userLocalStorage) {
            localStorage.removeItem('user');
        }
        authStore.user = {
            id: null,
            username: '',
            isAuth: false,
            isAdmin: false
        };
        router.push('/');
    });
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;

    .logo {
        line-height: 18px;
        margin: 0;
        font-size: 20px;
        color: #fff;
        font-weight: 500;
        font-family: 'Arizonia';
    }

    .header__menu {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4rem 0;

        .header__nav {
            ul {
                list-style-type: none;
                padding: 0;

                li {
                    button {
                        font-size: 1.5rem;
                        margin-left: 1rem;
                    }
                }
            }
        }

        .header__logout {
            background-color: $bg-grey;
            padding-bottom: 3px;
            border-bottom-right-radius: 7px;
            border-bottom-left-radius: 7px;
            z-index: 1;

            .header__logout-btn {
                margin-top: 1rem;
                font-size: 1.5rem;
                margin-left: 1rem;
            }
        }
    }

    .header__login {
        align-self: center;
        position: absolute;
        right: 0.5rem;
        top: 4rem;
        z-index: 1;

        .header__login-btn {
            width: 30px;
            height: 30px;
            padding: 0;
            border: none;
            background-color: inherit;
            cursor: pointer;
            transition: opacity 0.3s ease;

            .header__login-img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .header__dashboard {
        align-self: center;
        position: absolute;
        right: 0.5rem;
        top: 4rem;
        width: 30px;
        height: 30px;
        z-index: 1;

        .header__dashboard-btn {
            padding: 0;
            border: none;
            background-color: inherit;
            cursor: pointer;
            transition: opacity 0.3s ease;

            .header__dashboard-img {
                width: 100%;
                height: 100%;
            }
        }
    }

    @media (min-width: 601px) {
        .header__login {
            position: relative;
            top: 0;
        }

        .header__dashboard {
            position: relative;
            top: 0;
        }
    }

    @media (max-width: 600px) {
        .header__menu {
            position: fixed;
            top: -100%;
            right: 0;
            width: 240px;
            height: 100%;
            overflow: auto;
            background-color: $bg-grey;
            transition: all 0.3s ease 0s;
            z-index: 2;
        }

        .active-menu {
            top: 0;
        }
    }
}

@media (min-width: 601px) {
    .header {
        // grid-column: 2 / 5;
        // grid-row: 1 / -1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        margin: auto;
        max-width: 1000px;
        width: 100%;
        position: relative;
        background-color: $bg-dark;
        padding: 1rem;

        .logo {
            grid-row: 1 / 2;
            color: $accent-primary;
            line-height: 1;
            margin: 0;
            align-self: center;
        }

        .header__menu {
            flex-direction: row;
            justify-content: center;
            grid-row: 1;
            grid-column: 2 / 3;
            padding: 0;

            .header__nav {
                display: grid;

                .header__list {
                    display: flex;
                    align-self: center;

                    li {
                        button {
                            font-size: 18px;
                        }
                    }
                }
            }

            .header__logout {
                position: absolute;
                right: 0;
                top: 4.5rem;
                margin-right: 0.5rem;

                .header__logout-btn {
                    padding: 0 5px;
                    font-size: 13px;
                    margin-top: 0;
                    margin-left: 0;
                }
            }
        }

        .header__login,
        .header__dashboard {
            grid-row: 1;
            grid-column: 3 / -1;
            position: relative;
            right: 0;
            justify-self: end;

            button:hover,
            a:hover {
                opacity: 0.5;
            }
        }
    }
}
</style>
