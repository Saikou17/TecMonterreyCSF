
const authProvider={
    login: async ({ username , password }) => {
        console.log('Usuario:', username); // Imprimir el valor de Usuario en la consola
        console.log('Contrasena:', password); // Imprimir el valor de Contrasena en la consola
        const request = new Request('https://127.0.0.1:1337/login', {
            method: 'POST',
            body: JSON.stringify({ "Usuario":username, "Contrasena": password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            const auth = await response.json();
            console.log(auth)
            console.log(auth.Nombre)
            console.log(auth.Rol);
            localStorage.setItem('auth', auth.token);
            localStorage.setItem("permissions",auth.Rol);
            localStorage.setItem('identity',  JSON.stringify({"id": auth.id,  "Nombre":auth.Nombre}));
            return Promise.resolve()
        } catch {
            throw new Error('Error en usuario o password');
        }
    },
    logout: ()=>{
        localStorage.removeItem("auth");
        localStorage.removeItem("permissions");
        localStorage.removeItem("identity");
        return Promise.resolve();
    },
    checkAuth: ()=>{
        return localStorage.getItem("auth")? Promise.resolve(): Promise.reject();
    },
    checkError: (error) =>{ 
        if(error){
            const status=error.status;
            if(status===401|| status===403){
                localStorage.removeItem("auth");
                localStorage.removeItem("identity");
                localStorage.removeItem("permissions");
                return Promise.reject();
            }
        }
        return Promise.resolve();
    },
    getIdentity: ()=>{
        try{
            return Promise.resolve(JSON.parse(localStorage.getItem("identity")));
        }catch{
            return Promise.reject()
        }
    },
    getPermissions: ()=>{
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    },
};

export default authProvider;