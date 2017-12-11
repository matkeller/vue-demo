var AuthPlugin = {

    setToken: function (token, expiration) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authTokenExpiration', expiration);
    },

    destroyToken: function () {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiration');
    },

    /* Gets the token from local storage and verifies it has not expired */
    getToken: function () {
        var token = localStorage.getItem('authToken');
        var expiration = localStorage.getItem('authTokenExpiration');

        if (!token || !expiration)
            return null;

        if (Date.now() > parseInt(expiration)) {
            this.destroyToken();
            return null;
        } else {
            return token;
        }
    },

    /* Verifies user is logged in and double checks it has not expired */
    loggedIn: function () {
        if (this.getToken())
            return true;
        else
            return false;
    }
};

/* Register with Vue and make it visible everywhere */
export default function(Vue) {
    Vue.authPlugin = AuthPlugin;
    
    Object.defineProperties(Vue.prototype, {
        $authPlugin: {
            get: function() {
                return Vue.authPlugin;
            }
        }
    })
}