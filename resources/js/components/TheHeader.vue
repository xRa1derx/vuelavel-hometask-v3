<template>
    <header class="header">
        <h2 class="logo">
            My <br />
            Hometask
        </h2>
        <div :class="{ overlay: isMenuOpen }" @click.self="menu()"></div>
        <div class="header__menu" :class="{ 'active-menu': isMenuOpen }">
            <nav class="header__nav">
                <ul>
                    <li><button class="btn">Блог</button></li>
                    <li><button class="btn">Материалы</button></li>
                </ul>
            </nav>
            <div class="header__logout">
                <button title="logout" class="header__logout-btn btn">
                    Выйти
                </button>
            </div>
        </div>
        <div
            class="burger"
            :class="{ 'active-burger': isMenuOpen }"
            @click="menu()"
        >
            <span></span>
        </div>
        <div v-if="true" class="header__login">
            <button class="header__login-btn">
                <img src="/assets/images/door-open.svg" alt="" />
            </button>
        </div>
        <div v-else class="header__dashboard">
            <router-link to="/admin"
                ><img
                    class="header__dashboard-icon"
                    src="/assets/images/user.svg"
                    alt=""
            /></router-link>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOnWindowResize } from "../composables/windowResize";
const isMenuOpen = ref<boolean>(false);

useOnWindowResize(isMenuOpen, () => menu());

function menu() {
    isMenuOpen.value = !isMenuOpen.value;
    document.body.classList.toggle("overflow-hidden");
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    .logo {
        line-height: 18px;
        margin: 0;
        font-size: 20px;
        color: #fff;
        font-weight: 500;
        font-family: 'Arizonia';
    }
    .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.363);
        z-index: 1;
    }
    .header__menu {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4rem 0;
        .header__nav {
            ul {
                li {
                    button {
                        font-size: 1.5rem;
                        margin-left: 1rem;
                    }
                }
            }
        }
        .header__logout {
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
        right: 1rem;
        top: 4rem;
        .header__login-btn {
            width: 30px;
            height: 30px;
            padding: 0;
            border: none;
            background-color: inherit;
        }
    }
    .header__dashboard {
        width: 30px;
        height: 30px;
        align-self: center;
        position: absolute;
        right: 1rem;
        top: 4rem;
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
            z-index: 1;
        }
        .active-menu {
            top: 0;
        }
    }
}

@media (min-width: 601px) {
    .header {
        grid-column: 2 / 5;
        grid-row: 1 / -1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
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
                ul {
                    display: flex;
                    align-self: center;
                    li {
                        button {
                            font-size: 18px;
                        }
                    }
                }
            }
        }
        .header__login {
            grid-row: 1;
            grid-column: 3 / -1;
            position: relative;
            right: 0;
            justify-self: end;
        }
        .header__logout {
            display: none;
        }
    }
}
</style>
