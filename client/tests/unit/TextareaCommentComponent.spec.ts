import router from '@/router';
import TextareaCommentComponent from '@/components/Blog/TextareaCommentComponent.vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import { nextTick } from 'vue';
import { useAuthStore } from '@/stores/authStore';

describe('TextareaCommentComponent.vue', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render component', () => {
    const wrapper = mount(TextareaCommentComponent, {
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.exists()).toBeTruthy()
  })

  it('if user is not logged in, show guest button', async () => {
    const wrapper = mount(TextareaCommentComponent, {
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.find('[data-test=user-logged-in]').exists()).toBe(false);
    expect(wrapper.find('[data-test=user-not-logged-in]').exists()).toBe(true);
  })

  it('if user logged in, do not show guest button', async () => {
    const wrapper = mount(TextareaCommentComponent, {
      global: {
        plugins: [router]
      }
    });
    const authStore = useAuthStore();
    authStore.user.isAuth = true;
    await nextTick();
    expect(wrapper.find('[data-test=user-logged-in]').exists()).toBe(true);
    expect(wrapper.find('[data-test=user-not-logged-in]').exists()).toBe(false);
  })

})