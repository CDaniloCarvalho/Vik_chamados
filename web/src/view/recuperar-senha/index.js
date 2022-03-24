import React, { useState } from 'react';
import './recuperarSenha.css';
import { Link, Redirect } from "react-router-dom";
import Api from '../../components/api';
import axios from 'axios';
import emailjs from 'emailjs-com';
import Cookies from "js-cookie";


function RecuperarSenha({ match }){

    const [msg, setMsg] = useState(false);
    const [cemail, setEmail] = useState();
    
            {/* Redefinir a Senha */}
        async function sendEmail (e){    
            e.preventDefault();    
        if(cemail){   
            await axios.get(Api + '/usuarios')
            .then(response=> {                           
            return response.data;               
            }).then(response=>{
                var i = 0;
                while( i <1000 ){
                    var resposta = response[i];
                    i++
                    if(resposta.cemail === cemail) {        
                        var templateParams = {
                            cnome: resposta.cnome,
                            cemail: resposta.cemail,
                            csenha:resposta.csenha
                        };     
                        emailjs.send('service_vxknm0y', 'template_pvw0jfr', templateParams, 'o7fVIvVeMdRehaDgS')
                        setMsg('Sucesso');
                        templateParams.reset();
                    
                    }else{
                        setMsg('Erro');
                    }
                }                      
                }).catch(err => {
                    
                })
        }else{
            setMsg('Vazio');
        }
    }
    return(   
        <div className="container-fluid">
             {Cookies.get('cemail'|| 'csenha') ? <Redirect to='/home' /> : ''}
            <form className="form-redefinir rounded-3 shadow-lg" onSubmit={sendEmail}>
                <div className="msg text-center "> 
                    {msg === 'Sucesso' && <p className=" msg-text bg-success  text-white bg-opacity-79"><i class="fas fa-check-circle m-2"></i>Email Enviado!</p>}  
                    {msg === 'Erro' && <p className="p-1 msg-text lert alert-danger color-weigth" ><i class="fas fa-exclamation-triangle "></i> Verifique se o email está correto.</p>}   
                    {msg === 'Vazio' && <p className="p-1 text-center lert alert-danger color-weigth" ><i class="fas fa-exclamation-triangle "></i> Digite seu email.</p>}
                </div>
                <h4 className="h3  font-weight-normal text-center text-dark font-weight-bold">Recuperar Senha</h4> 
                <input onChange={(e) => setEmail(e.target.value)}  name="cemail" type="email" className="form-control mt-4 " placeholder="Email"/>
                <button  type="submit" className="btn btn-primary  w-100 btn-lg btn-enviar mt-4">
                    Enviar
                </button>

                <div className="link-opcoes mt-5 ">
                    <Link className="" to='/'>Já tenho conta </Link>
                </div>
            </form>
        </div>
    )
}

export default RecuperarSenha;
