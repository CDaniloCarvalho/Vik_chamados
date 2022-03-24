import React, { useState, useEffect } from "react";
import '../../view/index.css';
import Navbar from "../../components/navbar";
import Api from "../../components/api";
import axios from "axios";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Cookies from "js-cookie";
import emailjs from 'emailjs-com';
import fotoLogo from "../../components/img/arrow-link.svg";
import Logo from "../../components/img/Grupo-14.svg";
import Teste from "../../components/teste/teste";
import Chamados from "../../components/chamados";


function Home() {

    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = (dataAtual.getMonth() + 1);
    var ano = dataAtual.getFullYear();
    if(dia <= 9){
        dia = '0' + dia;
    }
    var datas = dia + "/" + mes + "/" + ano;

    const [data, setData] = useState(['']);
    const [comentarioChamado, setcomentarioChamado] = useState(['']);
    const [carregando, setCarregando] = useState();
    const [modalExcluirChamado, setModalExcluirChamado] = useState(false);
    const [ModalDetalhesChamado, setModalDetalhesChamado] = useState(false);
    const [ModalEditarChamado, setModalEditarChamado] = useState(false);
    const [msg, setMsg] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [novo, setNovo] = useState(false);
    const [andamento, setAndamento] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const [finalizado2, setFinalizado2] = useState(false);
    const [aguardando, setAguardando] = useState(false);
    const [limpar, setLimpar] = useState(true);
    const [filtrar, setFiltrar] = useState(false);
    const [chamados, setChamados] = useState(['']);
    const [aceitarSolicitacao, setAceitarSolicitacao] = useState(false);
    const [novoStatus, setNovoStatus] = useState('');
    const [visualizarAlteracoes, setVisualizarAlteracoes] = useState(false);

    const camposChamados =({
        nome: '' , email: '', areaSolicitante: '', cliente: '', motivoChamado: '', 
        submotivos: '', data: '',  status: '',  observacoes: '', chamadoId: '', tipos: ''
    });

    const [chamadosSelecionado, setChamadoSelecionado] = useState(camposChamados);

    const camposComentarios =({
        comentarioId: '', alteradoPor: Cookies.get('cnome'), comentario: '', alteracao:'', datas: datas, chamadoId: ''
    });

    const [comentarioSelecionado, setComentarioSelecionado] = useState(camposComentarios);

     {/* Abrir e fechar modal editar ou excluir chamado*/ }
    const selecionarChamado = (item, opcao) => { setChamadoSelecionado(item);
        opcao === "Editar" && abrirFecharModalEditarChamado() || opcao === 'Excluir' && abrirFecharModalExcluirChamado() || opcao === 'Detalhes' && abrirFecharModalDetalhesChamados();
    }

           {/*Mostrar ou esconder filtro*/ }
    const MostrarFiltro = () => {  setFiltrar(!filtrar); filterLimpar(); 
    }
   
    const abrirFecharObservacao = () => { setAceitarSolicitacao(!aceitarSolicitacao); }

    const abrirFecharModalEditarChamado = () => {setModalEditarChamado(!ModalEditarChamado)
        setAceitarSolicitacao(false); setVisualizarAlteracoes(false); setMsg(false);
    }

    const abrirFecharModalExcluirChamado = () => {setModalExcluirChamado(!modalExcluirChamado)
        setMsg(false);
    }

    const abrirFecharModalDetalhesChamados = () => {setModalDetalhesChamado(!ModalDetalhesChamado) 
        setVisualizarAlteracoes(false); setMsg(false);
    }

    const VerAlteracoes = () =>{setVisualizarAlteracoes(!visualizarAlteracoes)}
    
    const filterLimpar = () => {
        setAndamento(false);
        setFinalizado(false);
        setNovo(false);
        setFinalizado2(false);
        setAguardando(false);
        setLimpar(true);
        setUpdateData(true);
    }
    const filterNovo = () => {
        setAndamento(false);
        setFinalizado(false);
        setFinalizado2(false);
        setAguardando(false); 
        setLimpar(false);
        setNovo(true);
        setUpdateData(true);
    }
    const filterAndamento = () => {
        setNovo(false);
        setFinalizado(false);
        setFinalizado2(false);
        setAguardando(false);
        setLimpar(false);
        setAndamento(true);
        setUpdateData(true);
    }
    const filterFinalizado = () => {
        setNovo(false);
        setAndamento(false);
        setFinalizado2(false);
        setAguardando(false);
        setLimpar(false);
        setFinalizado(true);
        setUpdateData(true);  
    }
    const filterFinalizado2 = () => {
        setNovo(false);
        setAndamento(false);
        setFinalizado(false);
        setAguardando(false); 
        setLimpar(false);
        setFinalizado2(true);
        setUpdateData(true);  
    }
    const filterAguadando = () => {
        setNovo(false);
        setAndamento(false);
        setFinalizado(false);
        setFinalizado2(false);
        setLimpar(false);
        setAguardando(true); 
        setUpdateData(true);  

    }
  
    const handleChange3 = e => {
        const { name, value } = e.target;
        setChamadoSelecionado({
            ...chamadosSelecionado, [name]: value
        });
    }

    const handleChange4 = e => {
        const { name, value } = e.target;
        setComentarioSelecionado({
            ...comentarioSelecionado, [name]: value
        });
    }
      
       {/* Consulta lista de comentarios*/ }
       const ComentarioGet = async () => {        
            await axios.get(Api + "/comentarios")
            .then(resultado => {
                setcomentarioChamado(resultado.data.filter(comentarioSelecionado => camposComentarios.chamadoId === camposChamados.chamadoId))
            }).catch(error => {
                console.log(error);
            })                 
        }
        
            {/* Filtrar chamado por status*/ }
    const chamadoGet = async () => {
        if (Cookies.get('csetor') === ('Adm')) {
            if(andamento){ await axios.get(Api + "/chamados") .then(resultado => {
                setChamados(resultado.data.filter(chamadosSelecionado => chamadosSelecionado.status == "Em andamento"))                  
                }).catch(error => {
                    console.log(error);
                })
            }else if(novo){
                await axios.get(Api + "/chamados") .then(resultado => { 
                    setChamados(resultado.data.filter(chamadosSelecionado =>
                        chamadosSelecionado.status === "Novo" ))        
                }).catch(error => {
                    console.log(error);
                })
            }else if(finalizado){
                await axios.get(Api + "/chamados").then(resultado => {
                    setChamados(resultado.data.filter(chamadosSelecionado =>
                        chamadosSelecionado.status === "Resolvido"  ))         
                }).catch(error => {
                    console.log(error);
                })
            }else if(aguardando){
                await axios.get(Api + "/chamados").then(resultado => {
                    setChamados(resultado.data.filter(chamadosSelecionado =>
                        chamadosSelecionado.status === "Aguardando material"  ))         
                }).catch(error => {
                    console.log(error);
                })
            }else if(finalizado2){
                await axios.get(Api + "/chamados")
                .then(resultado => {
                    setChamados(resultado.data.filter(chamadosSelecionado => 
                        chamadosSelecionado.status === "Finalizado sem resolução"))  
                }).catch(error => {
                    console.log(error);
                })  
                }
                else{
                    await axios.get(Api + "/chamados")
                    .then(resultado => {
                        setChamados(resultado.data.filter(chamadosSelecionado => chamadosSelecionado.status != "Resolvido" & chamadosSelecionado.status != "Finalizado sem resolução"))  
                    }).catch(error => {
                        console.log(error);
                    })  
                }     
            
        }else{
            if(andamento){
                await axios.get(Api + "/chamados").then(resultado => {
                    setChamados(resultado.data.filter(chamadosSelecionado => chamadosSelecionado.status === "Em andamento" 
                    & chamadosSelecionado.nome === Cookies.get('cnome'))) 
                }).catch(error => {
                    console.log(error);
                })
            }else if(novo){
                await axios.get(Api + "/chamados") .then(resultado => {
                    setChamados(resultado.data.filter(chamadosSelecionado => chamadosSelecionado.status === "Novo"
                    & chamadosSelecionado.nome === Cookies.get('cnome')))              
                }).catch(error => {
                    console.log(error);
                })
            }else if(aguardando){
                    await axios.get(Api + "/chamados") .then(resultado => {
                        setChamados(resultado.data.filter(chamadosSelecionado => chamadosSelecionado.status === "Aguardando material"
                        & chamadosSelecionado.nome === Cookies.get('cnome')))              
                    }).catch(error => {
                        console.log(error);
                    })
                
            }else if(finalizado){
                await axios.get(Api + "/chamados").then(resultado => { 
                    setChamados(resultado.data.filter(chamadosSelecionado =>
                        chamadosSelecionado.status === "Finalizado" & chamadosSelecionado.nome === Cookies.get('cnome')))         
                }).catch(error => {
                    console.log(error);
                })
            }else if(finalizado2){
                await axios.get(Api + "/chamados").then(resultado => { 
                    setChamados(resultado.data.filter(chamadosSelecionado =>
                        chamadosSelecionado.status === "Finalizado sem resolução" & chamadosSelecionado.nome === Cookies.get('cnome')))         
                }).catch(error => {
                    console.log(error);
                })
            }else{
                await axios.get(Api + "/chamados").then(resultado => { 
                    setChamados(resultado.data.filter(chamadosSelecionado =>
                        chamadosSelecionado.status != "Finalizado sem resolução" & chamadosSelecionado.status != "Finalizado" & chamadosSelecionado.nome === Cookies.get('cnome')))         
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }
          
        {/* Editar pedido*/ }
        async function ChamadoPut(e) {
            e.preventDefault();
            setCarregando(true)
            chamadosSelecionado.status = novoStatus;
            await axios.put(Api + "/chamado/" + chamadosSelecionado.chamadoId, chamadosSelecionado) .then(resultado => {
                    setUpdateData(true)
                    setTimeout(() => { setMsg('Sucesso'); }, 500)
                    setCarregando(0)
                    setData(data.concat(resultado.data));
                    setTimeout(() => {  abrirFecharModalEditarChamado();  abrirFecharObservacao(); }, 2000)
                }).catch(error => {
                    setMsg('Erro');
                    setTimeout(() => { setMsg(false); }, 2000)
                    setCarregando(0)
                })          
                comentarioSelecionado.alteracao = chamadosSelecionado.status;
                comentarioSelecionado.chamadoId = chamadosSelecionado.chamadoId;
                await axios.post(Api + "/comentario", comentarioSelecionado)
                .then(resultado => {
                    setUpdateData(true);
                    console.log("cadastrado comentario")
                    setData(data.concat(resultado.data));
                }).catch(error => {
                    console.log("não cadastrado comentario")
                })     
            if(chamadosSelecionado.email != 'suportefgv@vikservices.com.br'){
                emailjs.sendForm('service_vxknm0y', 'template_vf18e7y', e.target, 'o7fVIvVeMdRehaDgS')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });  
                e.target.reset(); 
            }
        }

    useEffect(() => {
        if (updateData ) {
            ComentarioGet();
            chamadoGet();
            setUpdateData(false)  
            setTimeout(() => { setUpdateData(true)}, 15000) 
        }
    }, [updateData]);

    
    return (
        <> <div className="container-fluid d-flex" id="topo">
        <Navbar />
       <div className="main">
           <h3 className="text-center">SOLICITAÇÕES</h3> 
           <div class="d-grid gap-2 d-md-block">
                <label  onClick={MostrarFiltro}  className="btn-filtar" type="button">Filtrar por Status <i class="fas fa-filter"></i></label>
            </div>
               <div className=" main2 mx-auto  shadow-sm rounded">        
                   <table className=" form table table-hover border border-dark mt-2 shadow-sm p-3  bg-body rounded text-center">
                       <tbody >
                       {filtrar &&
                       <tr className="bg-info  ">
                          <th className="bg-info"><label ><nobr>Novo <input className="" onClick={() => filterNovo()} type="radio"  name="status"/></nobr></label></th>
                          <th className="bg-info"><label ><nobr>Em Andamento <input className=""onClick={() => filterAndamento()} type="radio" name="status" /></nobr></label></th>
                          <th className="bg-info"><label ><nobr>Finalizado <input className=""onClick={() => filterFinalizado()} type="radio" name="status" /></nobr></label></th>
                          <th className="bg-info"><label ><nobr>Aguardando Material <input className=""onClick={() => filterAguadando()} type="radio" name="status" className="" /></nobr></label></th>
                          <th className="bg-info"><label ><nobr>Finalizado Sem Resolução <input className=""onClick={() => filterFinalizado2()} type="radio" name="status" className="" /></nobr></label></th>
                          <th className="bg-info"><label ><nobr>Limpar Filtro <input className=""onClick={() => filterLimpar()} type="radio" name="status" className="" /></nobr></label></th>
                           </tr>  } 
                           {!filtrar &&
                           <tr className="bg-info  ">
                               <th className="bg-info"><nobr>N°</nobr></th>
                               <th className="bg-info"><nobr>NOME</nobr></th>
                               <th className="bg-info"><nobr>ÁREA SOLICITANTE</nobr></th>
                               <th className="bg-info"><nobr>TIPO DE SOLICITAÇÃO</nobr></th>
                               <th className="bg-info"><nobr>STATUS</nobr></th>
                               <th className="bg-info"><nobr>AÇÕES</nobr></th>
                           </tr>  }
                         
                               {chamados.map(item =>(<>
                               <tr>
                                    <td className="codigo"><nobr> {item.chamadoId}</nobr></td>
                                    <td><nobr>{item.nome}</nobr></td>
                                    <td><nobr>{item.areaSolicitante}</nobr></td>
                                    <td><nobr>{item.tipos}</nobr></td>
                                    <td><nobr>{item.status}</nobr></td>
                                    <td><nobr> {item.status != 'Resolvido' & item.status != 'Finalizado sem resolução' ? <> 
                                    <label disabled title="Não é possivel excluir um chamado" className=" mx-2 remover-detalhe btn" type="button"><i class="fas fa-ban"></i></label>&nbsp;&nbsp;
                                        {Cookies.get('csetor') == ('Adm') ? <>
                                            <label onClick={() => selecionarChamado(item, "Editar")} className="editar-detalhe btn" title="Editar"><i class=" icone-editar fas fa-edit"></i></label>
                                        </> : ''} </>:''}
                                        <label onClick={() => selecionarChamado(item, "Detalhes")} className="detalhes" title="+ Detalhes"><i class="fas fa-eye"></i></label>
                                    </nobr>&nbsp;&nbsp;</td>
                                </tr></>    
                            ))} 
                       </tbody>
                   </table>  
               </div>
               <a href="#topo" id="topo1" className="text-decoration-none text-light" title="Voltar ao topo"><i class="fas fa-arrow-up"></i></a>                  
        
                        {/* Editar lista de chamados*/ }
                        <Modal className="modalEditar" isOpen={ModalEditarChamado || ModalDetalhesChamado}>
                        <label onClick={ModalEditarChamado && abrirFecharModalEditarChamado || ModalDetalhesChamado && abrirFecharModalDetalhesChamados} class=" fechar-modal mb-5"><i class="modal-fechar fs-2 fas fa-times-circle"></i></label>
                        <ModalHeader><img className="fotoLogo" src={fotoLogo}/>&#160;&#160;&#160;&#160;&#160;&#160;{`${ ModalEditarChamado ? 'Editar Chamado' : 'Detalhes do Chamado' }`}</ModalHeader>
                        <ModalBody >
                            <div className="mensagem-tela">
                                {msg === 'Sucesso' && <p className=" p-1 mensagem alert alert-success"><i class="fas fa-check-circle "></i>&#160;Atualizado com sucesso!</p>}  
                                {msg === 'Erro' && <p className=" mensagem rounded p-1 lert alert-danger " ><i class="fas fa-exclamation-triangle "></i> &#160;Verifique se os dados estão corretos.</p>}
                                {msg === 'Vazio' && <p className="mensagem p-1 my-0 alert alert-warning" ><i class="fas fa-exclamation-triangle "></i> &#160;Digite os campos obrigatórios para concluir.</p>}
                            </div>
                                <form class="form row g-3  border-end-0" onSubmit={ChamadoPut}>
                                    
                                {!visualizarAlteracoes && <> {!aceitarSolicitacao && <>
                                    <div class="input-topo col-md-6">                
                                        <label  class="form-label">Solicitado por</label>
                                        <input name="nome" disabled value={chamadosSelecionado && chamadosSelecionado.nome} type="text" class="input-border form-control" />
                                        <input name="nome"  value={chamadosSelecionado && chamadosSelecionado.nome} type="text" class="d-none input-border form-control" />
                                        <input name="email"  value={chamadosSelecionado && chamadosSelecionado.email} type="text" class="d-none input-border form-control" />
                                    </div>
                                    <div class="col-sm mt-3">
                                        <label  class="">Area Solicitante</label>
                                        <input name="areaSolicitante" disabled value={chamadosSelecionado && chamadosSelecionado.areaSolicitante} class="input-border form-control" />
                                    </div>
                                    <div class="input-topo col-md-6">
                                        <label class="form-label">Codigo do chamado</label>
                                        <input value={chamadosSelecionado.chamadoId} disabled name="chamadoId" class="input-border form-control " />
                                        <input value={chamadosSelecionado.chamadoId} name="chamadoId" class="input-border d-none form-control " />
                                    </div>
                                    <div class="input-topo col-md-6">
                                        <label class="form-label">Status</label>
                                        <input value={chamadosSelecionado.status} disabled  name="status"  class="input-border form-control " />
                                        <input value={chamadosSelecionado.status}   name="status"  class=" d-none input-border form-control " />
                                    </div>
                                    <div class="col-md-6 input-topo">
                                        <label class="form-label">Cliente</label>
                                        <input  disabled value={chamadosSelecionado && chamadosSelecionado.cliente} type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-6 input-topo">
                                        <label class="form-label">Data da Solicitação</label>
                                        <input  disabled  value={chamadosSelecionado && chamadosSelecionado.data} name="data" type="text" class="form-control" />
                                    </div>  
                                    <div class="col-sm-12">
                                        <label for="inputZip" class="form-label">Motivo</label>                         
                                        <input  name="motivoChamado" disabled  value={chamadosSelecionado && chamadosSelecionado.motivoChamado} className="form-control" />
                                    </div>                            
                                    <div class="col-md-12 input-topo">
                                        <label class="form-label">Submotivo</label>
                                        < input disabled value={chamadosSelecionado && chamadosSelecionado.submotivos} type="text" class="form-control" />    
                                    </div>
                                    <div class="col-md-12 input-topo">
                                    <label class="form-label">Observações</label>
                                        { ModalEditarChamado && <textarea disabled name="observacoes" value={chamadosSelecionado && chamadosSelecionado.observacoes} type="text" class="form-control" />}
                                        { ModalDetalhesChamado && <textarea disabled  value={chamadosSelecionado && chamadosSelecionado.observacoes} type="text" class="form-control" />}
                                    </div>
                                    </>}</>}
                                    {!aceitarSolicitacao ? <>
                                        {!visualizarAlteracoes ? <label onClick={() =>VerAlteracoes()} className="btn" type="button">Visualizar Alterações <i class="fas fa-arrow-circle-up"></i></label>
                                        :<label onClick={() =>VerAlteracoes()} className="btn" type="button"><i class="fas fa-arrow-circle-left"></i> Voltar</label>}
                                        {visualizarAlteracoes && comentarioChamado.map(item =>(  chamadosSelecionado.chamadoId === item.chamadoId &&<>
                                        <div className="alteracaoChamados border row mx-auto p-2 mt-2">
                                            <div class="col-md-6 input-topo">
                                                <label class="form-label">Alteradopor</label>
                                                <input disabled name="observacoes" value={chamadosSelecionado.chamadoId === item.chamadoId   && item.alteradoPor} type="text" class="form-control" />
                                                <input value={chamadosSelecionado.email} name="email" type="text" className=" d-none input-border form-control" />
                                            </div>
                                            <div class="col-md-5 input-topo">
                                                <label class="form-label">Data</label>
                                                <input disabled name="observacoes" value={chamadosSelecionado.chamadoId === item.chamadoId  && item.datas} type="text" class="form-control" />
                                            </div>
                                            <div class="col-md-12 input-topo">
                                                <label class="form-label">Status atualizado para</label>
                                                <input disabled name="comentario" value={chamadosSelecionado.chamadoId === item.chamadoId  && item.alteracao} type="text" class="form-control" />
                                            </div>
                                            <div class="col-md-12 input-topo">
                                                <label class="form-label">Observações</label>
                                                <textarea disabled name="comentario" value={chamadosSelecionado.chamadoId === item.chamadoId  && item.comentario} type="text" class="form-control" />
                                            </div>
                                        </div>    
                                        </>))}
                                    </>:''}    
                                
                                {aceitarSolicitacao && <>
                                    <div class="input-topo col-md-6">
                                        <label class="form-label">Codigo do chamado</label>
                                        <input value={chamadosSelecionado.chamadoId} disabled name="chamadoId" class="input-border form-control " />
                                        <input value={chamadosSelecionado.chamadoId} name="chamadoId" class="input-border d-none form-control " />
                                        <input name="nome"  value={chamadosSelecionado && chamadosSelecionado.nome} type="text" class="d-none input-border form-control" />
                                        <input name="email"  value={chamadosSelecionado && chamadosSelecionado.email} type="text" class="d-none input-border form-control" />
                                        <input  value={chamadosSelecionado && chamadosSelecionado.submotivos} type="text" class="d-none form-control" />    
                                    </div>
                                    <div class="input-topo col-md-6">
                                        <label class="form-label">Status</label>
                                        <input onChange={handleChange3} name="datas" value={datas} className="d-none"/>
                                        <input value={chamadosSelecionado.status} disabled name="status"  class="input-border form-control " />
                                        <input value={novoStatus}  onChange={handleChange3} name="status"  class=" d-none input-border form-control " />
                                    </div>
                                    <div class="input-topo col-md-12">
                                        <label onChange={(e) => setNovoStatus(e.target.value)} name="statuss"><input className="mx-2" type="radio" name="statuss" value="Em andamento"/>Em andamento</label>
                                        <label onChange={(e) => setNovoStatus(e.target.value)} name="statuss"><input className="mx-2" type="radio" name="statuss" value="Aguardando material"/>Aguardando material </label>
                                        <label onChange={(e) => setNovoStatus(e.target.value)} name="statuss"><input className="mx-2" type="radio" name="statuss" value="Resolvido"/>Resolvido</label>
                                        <label onChange={(e) => setNovoStatus(e.target.value)} name="statuss"><input className="mx-2" type="radio" name="statuss" value="Finalizado sem resolução"/>Finalizado sem resolução</label>
                                    </div>
                                    <div class="col-md-12 input-topo mt-2">
                                        <label class="form-label text-danger">Deixar uma observação</label>
                                        <input value={novoStatus}  onChange={handleChange3} name="status"  class=" d-none input-border form-control " />
                                        <input onChange={handleChange4} name="chamadoId"  class=" d-none input-border form-control " />
                                        <input   onChange={handleChange4} name="datas" value={datas} class="d-none input-border form-control " />

                                        { ModalEditarChamado && <textarea onChange={handleChange4} name="comentario"  type="text" class="form-control" />}
                                    </div>
                                    <ModalFooter>
                                        
                                        {carregando  ? <button class="btn btn-success " type="submit" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                                        : <button  className=" btn btn-success " type="submit">Enviar</button>} 
                                        { chamadosSelecionado.status === 'Em Andamento' &&<>
                                        </>} 
                                        <button onClick={abrirFecharObservacao} className=" btn  btn-primary" type="button">voltar</button>
                                    </ModalFooter>  
                                </>}

                                { !ModalDetalhesChamado & !aceitarSolicitacao ?
                                <ModalFooter  className="Modal-Footer">
                                   
                                    {carregando & abrirFecharObservacao ? <button class="btn btn-success " type="submit" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                                    : <button onClick={abrirFecharObservacao} className=" btn btn-success " type="submit">Alterar Status</button>}
                                    
                                    {carregando & ChamadoPut ? <button class="btn btn-secondary  btn-primary " type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                                    : <button  className=" btn btn-primary " type="submit">Editar</button>} 
                                    {!ModalDetalhesChamado &&<button onClick={() => abrirFecharModalEditarChamado()} className=" btn  btn-danger" type="button">Cancelar</button>}
                                    {ModalDetalhesChamado &&<button onClick={() => abrirFecharModalDetalhesChamados()} className=" btn  btn-danger" type="button">Cancelar</button>}
                                </ModalFooter> :''}

                            </form>
                        </ModalBody>                       
                    </Modal>
                </div>
                <div class=" btns-home d-grid  d-md-flex justify-content-md-end">
                    <div className="incluirchamados  "><Chamados  /></div>
                    {//<div className="incluirPedido  "><NovoPedido/></div>
                    }
                </div>
            </div>           
        </>
    )
} 
export default Home;