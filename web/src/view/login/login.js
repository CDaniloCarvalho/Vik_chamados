import React, { useState } from 'react';
import './login.css';
import { Link, Redirect } from "react-router-dom";
import Api from '../../components/api';
import axios from 'axios';
import Cookies from "js-cookie";
import Logo from "../../components/img/logo.png";


function Login(){
 
    const [msg, setMsg] = useState(false);
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [carregando, setCarregando] = useState(false);

    
    {/* Realizar Login */}
    
        async function Logar (e){    
            e.preventDefault();    
            setCarregando(true)
        if(email){
            await axios.get(Api + '/usuarios')
            .then(response=> {                    
            return response.data;              
            }).then(response=>{
                var i = 0;
                while( i <1000 ){
                    var resposta = response[i];
                    i++
                    if(resposta.cemail === email & resposta.csenha === senha) {     
                        Cookies.set('usuarioid', resposta.usuarioid, {path: "/"}, {secure: true, sameSite: 'none'});      
                        Cookies.set('cemail', resposta.cemail, {path: "/"}, {secure: true, sameSite: 'none'});  
                        Cookies.set('cnome', resposta.cnome, {path: "/"}, {secure: true, sameSite: 'none'});
                        Cookies.set('csetor', resposta.csetor, {path: "/"}, {secure: true, sameSite: 'none'});
                        setCarregando(true)
                        setTimeout(() => {  setCarregando(false)  }, 2000)
                        setTimeout(() => {  setMsg('Sucesso'); }, 1000)
                        setTimeout(() => {  window.location.href="./home";  }, 3000)
                        break;
                    }else{
                        setCarregando(true)
                        setTimeout(() => {  setCarregando(false)  }, 1000)
                        setTimeout(() => {   setMsg('Erro');  }, 1000)
                        setTimeout(() => {  setMsg(false); }, 5000)
                    }
                }                      
                }).catch(err => {
                })
        }else{
            setCarregando(true)
            setTimeout(() => {  setCarregando(false)  }, 1000)
            setTimeout(() => { setMsg('Vazio');  }, 1000)
            setTimeout(() => {  setMsg(false); }, 6000)
        }
    }
    return(   
        
        <div className="container-fluid">
                  {Cookies.get('cemail') ? <Redirect to='/home' /> : ''}
        <div className=""></div>
        <form class="form-login rounded-3 shadow-lg ">
        
            <div className="login-logo mx-auto" >{<img className="logo-login " src={Logo}/>}</div>
            <h3 className="h3-login my-1 font-weight-normal text-center text-dark font-weight-bold mt-4">Login</h3>
            <div className="mt-2">
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="text" className="form-control" type="email" name="cemail" onChange={(e) => setEmail(e.target.value)} /></div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Senha</label>
                    <input  type="password" className="form-control" name="csenha"  onChange={(e) => setSenha(e.target.value)} />
                </div>
                <div className="mb-3">
                {carregando ? <button class="btn btn-primary  btn-lg btn-login" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                :<button onClick={Logar} className=" btn btn-primary  btn-lg btn-login" type="submit" >Logar</button>}
                </div >
                <div className="msg-login text-center ">
                {msg === 'Sucesso' && <p className=" p-1  alert alert-success"><i class="fas fa-check-circle "></i>&#160;Login realizado com sucesso!</p>}  
                {msg === 'Erro' && <p className="  rounded p-1 lert alert-danger " ><i class="fas fa-exclamation-triangle "></i> &#160;Email ou senha incorretos.</p>}
                {msg === 'Vazio' && <p className="p-1 my-0 alert alert-warning" ><i class="fas fa-exclamation-triangle "></i> &#160;Digite seu email e senha.</p>}
            </div>  
                <div className="link-opcoes mt-5 ">
                    <Link className="" to='/recuperarsenha'>Recuperar senha </Link>

                </div>
            </div>
        </form>
    </div>
    )
}

export default Login;
