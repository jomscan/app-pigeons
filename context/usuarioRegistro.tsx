import { createContext, useContext, useState } from "react";

interface usuarioRegistroType {

    nombreUsuario:string;
    passwordUsuario:string;
    autorizado:boolean;
    uidUsuario:string;

    setNombreUsuario:(nombre:string)=>void;
    setPasswordUsuario:(password:string)=>void;
    setAutorizado:()=>void;
    setuidUsuario:(uid:string)=>void;


}



const UserContext = createContext < usuarioRegistroType | undefined > (
    undefined
);

export const useUsuarioRegistroApp=()=>{
    const context =  useContext(UserContext);
    if (!context){
        throw new Error ("useUsuarioRegistroApp ha de ser usado dentro de un provider UsuarioRegistroAppProvider");
    }
    return context;
};

export const UsuarioRegistroAppProvider : React.FC < {children:React.ReactNode}> = ({
    children,
})=>{
    const [nombreUsuario,addNombreUsuario] = useState < usuarioRegistroType ["nombreUsuario"] > ("");
    const [passwordUsuario,addPasswordUsuario] = useState < usuarioRegistroType ["passwordUsuario"] > ("");
    const [autorizado,addAutorizarUsuario] = useState < usuarioRegistroType ["autorizado"] > (false);
    const [uidUsuario,adduidUsuario] = useState < usuarioRegistroType ["uidUsuario"] > ("");

    const setNombreUsuario = (nombre:string)=>addNombreUsuario(nombre);
    const setPasswordUsuario = (password:string)=>addPasswordUsuario(password);
    const setAutorizado = ()=> addAutorizarUsuario(!autorizado); 
    const setuidUsuario = (uid:string) => adduidUsuario(uid);


    return (
        < UserContext.Provider
        value={{nombreUsuario,passwordUsuario,autorizado,uidUsuario,setNombreUsuario,setPasswordUsuario,setAutorizado,setuidUsuario}}  >
            {children}
        </UserContext.Provider>  )
}