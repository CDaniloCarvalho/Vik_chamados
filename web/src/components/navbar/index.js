import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import Cookies from "js-cookie";
import "./navbar.css";
import foto from "../img/arrow-link.svg";
import Logo from "../img/Grupo-14.svg";
import axios from "axios";
import Api from "../api";

function Navbar() {

    const [pedidoSelecionado, setPedidoSelecionado] = useState();
    const [updateData, setUpdateData] = useState(true);
    const [data, setData] = useState(['']);
    const [chamados, setChamados] = useState([''])
    const [notificacoes, setNotificacoes] = useState(false);
    
    var contChamado = 0;

    const VerNotificacoes = () =>{
        setNotificacoes(!notificacoes);
       
    }
    
    {/* Caso o usuário click em sair será redirecionado para a tela de login*/}
    function Sair(){ 
        Cookies.remove('id', {path: "/"});
        Cookies.remove('cemail', {path: "/"});
        Cookies.remove('cnome', {path: "/"});
        Cookies.remove('csetor', {path: "/"});
        Cookies.remove('telefone', {path: "/"});
        Cookies.remove('csenha', {path: "/"});
        window.location.href='./';
    }
    const [navbar, setNavbar] = useState(false);

    const Menu = () => {  
        setNavbar(!navbar);  
    }

    const ChamadoGet = async () => {
        await axios.get(Api + "/chamados") .then(resultado => {
            setChamados(resultado.data.filter(pedidoSelecionado => pedidoSelecionado.status === "Novo"))                  
        }).catch(error => {
            console.log(error);
        })
    }   

    useEffect(() => {
        if (updateData) {
            ChamadoGet();
            setUpdateData(false);
        }
    }, [updateData]);

    return (
        <>
            {/* Caso o usuário não esteja logado será redirecionado para a tela de login*/}
            {!Cookies.get('cemail'|| 'csenha') ? <Redirect to='/' /> : ''}
            <div className="topo-home">
               <div className="logo " >{<img src={Logo}/>}</div>
               
                <label class=" bt-menu" type="button" onClick={Menu}>
                    <i class="fas fa-bars"></i>
                </label>
                <p className="nome-usuario">Bem vindo  {Cookies.get('cnome')} </p>
                 
                 {/* Marcador de notificações*/}
                 { chamados.map(item => (contChamado++, <></> )) }
                
                { Cookies.get ('csetor') == ("Adm") &&
                <label onClick={VerNotificacoes} type="button" class="btn-notificacoes btn btn-primary position-relative">
                <i class="far fa-bell"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {contChamado}+
                    </span>
                </label>}
                {notificacoes && 
                    <div className="notificacoes">
                        <div class="row">
                            <div class="col">
                                <div class="card card-body">
                                    {contChamado === 0 ?  <p>Você não tem nenhuma solicitação pendente!</p> : <p>Você tem {contChamado} novos chamados.</p> }                
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <p className="sair" onClick={Sair}> <i class="fas fa-sign-out-alt"></i> Sair</p>
            </div>
            <div class="manu1">
                    <div class="card" >
                        <nav class=" menu">                      
                            <ul className="mt-3">
                                <li className="link-menu ">
                                    <Link className="link" to="/home" >
                                        <i class="fas fa-home" ></i> <span class="text-menu ms-1 ">Home</span>
                                        <img className="foto-seta" src={foto}/>
                                    </Link>
                                </li>
                                <li className="link-menu ">
                                    <Link className="link" to="/minha-conta" >
                                    <i class="fa fa-user" ></i><span class="text-menu ms-1 ">Minha Conta</span>
                                    <img className="foto-seta" src={foto}/>
                                    </Link>
                                </li>
 
                                { Cookies.get ('csetor') == ("Adm") || Cookies.get('csetor') == ('Rh')?
                                <li className="submenu ">
                                    <Link className="link-sub-menu" to="#" >
                                        <i class="fas fa-tools"></i><span class="text-menu ms-1 ">Administração</span>
                                        <img className="foto-seta" src={foto}/>
                                    </Link>
                                    <ul className="linkSubmenu">
                                        <li className=" link-text mt-3">
                                            <Link className="link-none" to="/Clientes" >
                                                <i class="far fa-building"></i> <span class="text-menu ms-1 ">Clientes</span>
                                                <img className="foto-seta" src={foto}/>
                                            </Link>
                                        </li>
                                        { Cookies.get ('csetor') == ("Adm")  ?
                                        <li className=" link-text" >
                                            <Link className="link-none" to="/usuarios">
                                                <i class="fas fa-users"></i> <span class="text-menu ms-1 ">Usuários</span>
                                                <img className="foto-seta" src={foto}/>
                                            </Link>
                                        </li>
                                        :''}
                                        {/*<li className=" link-text">
                                            <Link className="link-none" to="/produtos">
                                                <i class="fas fa-box-open"></i> <span class="text-menu ms-1">Produtos</span>
                                                <img className="foto-seta" src={foto}/>
                                            </Link>
                                        </li>
                                      
                                        <li className=" link-text" >
                                            <Link className="link-none" to="/estoque">
                                                <i class="fas fa-boxes"></i> <span class="text-menu ms-1 ">Estoque</span>
                                                <img className="foto-seta" src={foto}/>
                                            </Link>
                                        </li>*/}
                                        
                                    </ul>
                                </li>
                                :''}
                            </ul>
                        </nav>
                    </div>
                </div>
            {navbar &&
                <div class="manu2">
                    <div class="card" >
                        <nav class=" menu">                      
                            <ul className="mt-3">
                                <li className="link-menu ">
                                    <Link className="link" to="/home" >
                                        <i class="fa fa-home" ></i> <span class="text-menu ms-1 ">Home</span>
                                        <img className="foto-seta" src={foto}/>
                                    </Link>
                                </li>
                                <li className="link-menu ">
                                    <Link className="link" to="/minha-conta" >
                                    <i class="fa fa-user" ></i><span class="text-menu ms-1 ">Minha Conta</span>
                                    <img className="foto-seta" src={foto}/>
                                    </Link>
                                </li>
                                { Cookies.get ('csetor') == ("Adm") || Cookies.get('csetor') == ('Rh') ?
                                <li className="submenu ">
                                    <Link className="link-sub-menu" to="#" >
                                        <i class="fas fa-tools"></i><span class="text-menu ms-1 ">Administração</span>
                                        <img className="foto-seta" src={foto}/>
                                    </Link>
                                    <ul className="linkSubmenu">
                                        <li className=" link-text mt-3">
                                            <Link className="link-none" to="/Clientes" >
                                                <i class="far fa-building"></i> <span class="text-menu ms-1">Clientes</span>
                                                <img className="foto-seta" src={foto}/>
                                            </Link>
                                        </li>
                                        { Cookies.get ('csetor') == ("Adm")  ?
                                        <li className=" link-text" >
                                            <Link className="link-none" to="/usuarios">
                                                <i class="fa fa-user" ></i> <span class="text-menu ms-1 ">Usuários</span>
                                                <img className="foto-seta" src={foto}/>
                                            </Link>
                                        </li>
                                        :''}
                                       {/* <li className=" link-text">
                                            <Link className="link-none" to="/produtos">
                                            <i class="fas fa-box-open"></i> <span class="text-menu ms-1 ">Produtos</span>
                                            <img className="foto-seta" src={foto}/>
                                            </Link>
                                        </li>
                                        <li className=" link-text" >
                                            <Link className="link-none" to="/estoque">
                                                <i class="fas fa-boxes"></i> <span class="text-menu ms-1 ">Estoque</span>
                                                <img className="foto-seta" src={foto}/>
                                            </Link>
                                        </li>*/}
                                        
                                    </ul>
                                </li>
                                :''}
                            </ul>
                        </nav>
                    </div>
                </div>
            }
        </>
    )
}

export default Navbar;