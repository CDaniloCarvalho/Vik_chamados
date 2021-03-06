import React, { useEffect, useState } from "react";
import Api from "../api";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from "js-cookie";
import fotoLogo from "../../components/img/arrow-link.svg";
import emailjs from 'emailjs-com';


function Chamados() {
   
    const [data, setData] = useState(['']);
    const [carregando, setCarregando] = useState();
    const [modalIncluir, setModalIncluir] = useState(false);
    const [msg, setMsg] = useState(false);
    const [updateData, setUpdateData] = useState(true); 
    const [pesquisa, setPesquisa] = useState('');
    const [cliente, setCliente] = useState(['']);
    const [codChamado, setCodChamado] = useState();
    const [motivosChamados, setMotivosChamados] = useState(['']);
    const [submotivosChamados, setSubMotivosChamados] = useState(['']);

    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = (dataAtual.getMonth() + 1);
    var ano = dataAtual.getFullYear();
    if(dia <= 9){ dia = '0' + dia; }
    if(mes <= 9){ mes = '0' + mes; }
    
    var datas = dia + "/" + mes + "/" + ano;
    const dados = ({
        chamadoId:'' , nome: Cookies.get('cnome'), areaSolicitante: Cookies.get('csetor'), email: Cookies.get('cemail'), cliente: '', 
        motivoChamado: '',submotivos: '', data: datas, observacoes: '', status: 'Novo' , tipos: 'Chamado'
    });
    
    const [chamadoSelecionado, setChamadoSelecionado] = useState(dados);

    const dadosMotivos = ({
        motivos_chamadoId:'' , motivos_chamado: ''
    });

    const [motivoSelecionado, setMotivoSelecionado] = useState(dadosMotivos);

    const dadosSubMotivos = ({
        submotivoId:'' , submotivo: ''
    });
    
    const [subMotivoSelecionado, setSubMotivoSelecionado] = useState(dadosSubMotivos);

    var dat = dia + mes;
    const cod = Math.floor(Math.random() * 1000000);
    
        {/* Abrir e fechar modal incluir pedidos*/ }
    const abrirFecharModalIncluir = () => {  
        setModalIncluir(!modalIncluir)
        //console.log(cod);
        setUpdateData(true);
        setTimeout(() => { setMsg(false); }, 5000)
        setChamadoSelecionado(dados);
        setCodChamado(cod)
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setChamadoSelecionado({
            ...chamadoSelecionado, [name]: value
        });
    }
    
        {/* Lista de clientes*/ }
        const clienteGet = async () => {
            await axios.get(Api + "/clientes",).then(resultado => {
                setCliente(resultado.data)
                
            }).catch(error => {
                console.log(error);
            })   
        }

        {/* Lista de motivos / chamados*/ }
        const Motivos_chamadosGet = async () => {
            await axios.get(Api + "/motivos_chamados",).then(resultado => {
                setMotivosChamados(resultado.data)
            }).catch(error => {
                console.log(error);
            })   
        }

         {/* Lista de motivos / chamados*/ }
         const Submotivos_chamadosGet = async () => {        
                await axios.get(Api + "/submotivos_chamados",).then(resultado => {
                    setSubMotivosChamados(resultado.data)
                }).catch(error => {
                    console.log(error);
               });       
        }

        {/* Realizar novo pedido*/ }
    async function sendEmail(e) {
        chamadoSelecionado.chamadoId = codChamado
        e.preventDefault();
        if (!chamadoSelecionado.cliente  ){
            setMsg('Vazio');
            setTimeout(() => { setMsg(false) }, 4000)
        }else {
            await axios.post(Api + "/chamado", chamadoSelecionado).then(resultado => {
                    setData(data.concat(resultado.data));
                    setTimeout(() => { abrirFecharModalIncluir(); }, 2000)
                    setMsg('Sucesso')
                    setTimeout(() => { setMsg(false); }, 7000)
                }).catch(error => {
                    setMsg('Erro');
                    setTimeout(() => { setMsg(false); }, 5000)
                    setCarregando(0)
                })
            if(Cookies.get('cemail') != 'suportefgv@vikservices.com.br'){
                emailjs.sendForm('service_vxknm0y', 'template_vf18e7y', e.target, 'o7fVIvVeMdRehaDgS')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });  
                e.target.reset(); 
            }
        };
    }
  
    useEffect(() => {
        if (updateData || pesquisa) {
            clienteGet();
            Submotivos_chamadosGet();
            Motivos_chamadosGet();
            setUpdateData(false);              
        }
    }, [updateData, pesquisa]);

    
  return (
    <> 
    <div className="mensagem-tela">
        {msg === 'Sucesso' && <p className="mensagem text-center p-1  alert alert-success"><i class="fas fa-check-circle "></i>&#160;Chamado realizado com sucesso!</p>}  
    </div> 
     <label onClick={abrirFecharModalIncluir} type="button" class="btn btn-chamados btn-primary" data-toggle="modal" data-target=".exampleModalToggleLabel">Abertura de Chamados</label>
        
        <div className="modal  exampleModalToggleLabel">        
            <div className="modal-dialog modal-lg">
                <div className="modal-content  text-dark p-4 border">
                    <label data-toggle="modal" data-target=".exampleModalToggleLabel" onClick={abrirFecharModalIncluir}  class=" fechar-modal mb-5"><i class="modal-fechar fs-2 fas fa-times-circle"></i>&#160;&#160;&#160;&#160;&#160;&#160;</label>
                    <form onSubmit={sendEmail} class="form row g-3 border">
                        <div className="border-bottom foto-modal">
                            <img className="fotoLogo" src={fotoLogo}/>&#160;&#160;&#160;&#160;&#160;&#160;<h5 className="h5-modal">Abertura de Chamados </h5>
                        </div>
                        <div className="mensagem-tela">
                            {msg === 'Erro' && <p className=" mensagem rounded text-center p-1 lert alert-danger " ><i class="fas fa-exclamation-triangle "></i> &#160;N??o foi poss??vel concluir o pedido.</p>}
                            {msg === 'Vazio' && <p className="mensagem p-1 text-center my-0 alert alert-warning" ><i class="fas fa-exclamation-triangle "></i> &#160;Digite os campos obrigat??rios.</p>}
                        </div>                       
                        <div class="input-topo col-md-8">
                            <input value={chamadoSelecionado.nome} name="nome" type="text" className=" d-none input-border form-control" />
                            <input value={chamadoSelecionado.chamadoId} name="chamadoId" type="text" className=" d-none  input-border form-control" />
                            <input value={chamadoSelecionado.email} name="email" type="text" className=" d-none input-border form-control" />
                            <nobr> <label class="overflow-hidden" name="nome" type="text" className="input-border form-control" >{chamadoSelecionado.nome}</label></nobr>
                        </div>
                        <div class="input-topo col-md-4">
                            <label  name="areaSolicitante" type="text" class="input-border form-control">{chamadoSelecionado.areaSolicitante}</label> 
                        </div>
                        <div class="input-topo col-md-6">
                            <label for="inputEmail4" class="form-label">Cliente / Opera????o <span className="text-danger "> *</span></label>
                            <select onChange={handleChange} name="cliente" type="text" class="form-select">
                                <option selected>Selecione uma op????o</option>
                                {cliente.map(item => ( <><option> { item.departamento }</option></> ))}
                            </select>
                        </div>
                        <div class="input-topo col-md-6">
                            <label for="inputEmail4" class="form-label">Data da Solicita????o</label>
                            <input  disabled  value={datas} type="text"  className="form-control" />
                        </div>
                        <div class="col-sm mt-3">
                            <label for="inputZip" class="form-label">Motivo<span className="text-danger "> *</span></label>                     
                            <select onChange={handleChange} name="motivoChamado" id="inputState" className="form-select" >
                                <option selected>Selecione uma op????o</option>
                                { motivosChamados.map(item =>( <>
                                    <option>{item.motivos_chamado}</option>
                                </>  ))} 
                            </select>
                        </div>
                        <div class="col-sm mt-3">      
                            <label for="inputZip" class="form-label">SubMotivo<span className="text-danger "> *</span></label>                          
                            <select onChange={handleChange} name="submotivos" id="inputState" className="form-select" >
                                <option selected>Selecione uma op????o</option>  
                                {submotivosChamados.map(item=>(<>
                                    {chamadoSelecionado.motivoChamado === "CRM" & item.submotivoId === 1 &&  <option>{item.submotivoId === 1 && item.submotivo}</option>} 
                                    {chamadoSelecionado.motivoChamado === "PORTAL PTR" & item.submotivoId === 2 &&  <option>{item.submotivoId === 2 && item.submotivo}</option>}
                                </>))}                           
                            </select> 
                         </div>                                    
                        <div class="col-md-12">
                            <label for="inputZip" className="form-label">Coment??rios</label>
                            <textarea onChange={handleChange} name="observacoes" type="text" className="form-control" />
                        </div>
                        <ModalFooter> 
                            {carregando ? <button className="btn btn-secondary " type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                                :<button className=" btn btn-primary" data-toggle={chamadoSelecionado.cliente && "modal"}  data-target={chamadoSelecionado.cliente && ".exampleModalToggleLabel"} type="submit">Cadastrar</button>}
                            <button data-toggle="modal" data-target=".exampleModalToggleLabel" onClick={abrirFecharModalIncluir} className=" btn  btn-danger" type="button">Cancelar</button>
                        </ModalFooter>
                    </form>
                </div>
            </div>
        </div> 
    </>
  );
}
export default Chamados;

