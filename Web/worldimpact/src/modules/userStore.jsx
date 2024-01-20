import create from 'zustand';

const useUserStore = create(set => ({
    isLoggedIn: false,
    setLoginStatus: (status) => set({ isLoggedIn: status})
}));

export default useUserStore;