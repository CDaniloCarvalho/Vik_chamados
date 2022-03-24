import React, { useEffect, useState } from "react";
import Api from "../api";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from "js-cookie";
import fotoLogo from "../../components/img/arrow-link.svg";
import emailjs from 'emailjs-com';


function Teste() {
   
    const [data, setData] = useState(['']);
    const [carregando, setCarregando] = useState();
    const [modalIncluir, setModalIncluir] = useState(false);
    const [msg, setMsg] = useState(false);
    const [updateData, setUpdateData] = useState(true); 
    const [produtos, setProdutos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [selecionar, setSelecionar] = useState('');
    const [cliente, setCliente] = useState([]);
    const [pedidoProduto, setPedidoProduto] = useState([]);
    const [selecionaPedidoProduto, setSelecionaPedidoProduto] = useState(['']);
    const [deleteProduto, setDeleteProduto] = useState('');
    const [codPedido, setCodPedido] = useState();

    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = (dataAtual.getMonth() + 1);
    var ano = dataAtual.getFullYear();
    if(dia <= 9){
        dia = '0' + dia;
    }
    var datas = dia + "/" + mes + "/" + ano;

    const dados = ({
        pedidoId:'' , nome: Cookies.get('nome'), areaSolicitante: Cookies.get('setor'), email: Cookies.get('email'), cliente: '', 
        motivo: '', data: datas, destinatario: '',observacoes: '', status: 'Novo' 
    });
   
    const [pedidoSelecionado, setPedidoSelecionado] = useState(dados);

    const cod = Math.floor(Math.random() * 1000)+dia+mes;
  

    const dadosProdutos = ({
        pedido_produtoId: '', pedidoId: '', nome_produto: '' , quantidade: ''
    });

    const [pedidoProdutoSelecionado, setPedidoProdutoSelecionado] = useState(dadosProdutos);
    

        {/* Abrir e fechar modal incluir pedidos*/ }
    const abrirFecharModalIncluir = () => {  
        setModalIncluir(!modalIncluir)
        console.log(cod);
        setUpdateData(true);   

        setTimeout(() => { setMsg(false); }, 5000)
        setPedidoSelecionado(dados);
        setCodPedido(cod)
    }
     console.log(codPedido)
    const handleChange = e => {
        const { name, value } = e.target;
        setPedidoSelecionado({
            ...pedidoSelecionado, [name]: value
        });
    }

    const handleChange2 = e => {
        const { name, value } = e.target;
        setPedidoProdutoSelecionado({
            ...pedidoProdutoSelecionado, [name]: value
        });
    }
    
   
            {/* Salvar de produtos*/ }
        const SalvarProduto = async () => {
            pedidoProdutoSelecionado.pedidoId = codPedido
            await axios.post(Api + '/pedido_produto', pedidoProdutoSelecionado).then(resultado => {
                setPedidoProduto(data.concat(resultado.data));
                setSelecionaPedidoProduto(dadosProdutos);
                setUpdateData(true);   
            }).catch(error =>{
                console.log('Não foi possível salvar!');
            });
        }
               {/* Consultar de produtos*/ }
        const GetProduto = async () => {
            await axios.get(Api + '/pedido_produtos').then(resultado => {
                setData(resultado.data.filter(pedidoProdutoSelecionado =>
                    dados.produtoId === dadosProdutos.produtoId))  
                    
            }).catch(error =>{
                console.log('Não foi possível!');
            });
        }

            {/* Atualizar de produtos*/ }
        const PedidoProdutoPut = async () => {
            await axios.put(Api + "/pedido_produto/" + pedidoProdutoSelecionado.usuarioId, pedidoProdutoSelecionado)
            .then(resultado => {
                setUpdateData(true);
                setTimeout(() => {
                    setMsg("Sucesso");
                }, 500)
            }).catch(erro => {          
                setTimeout(() => {
                    setMsg("Erro");
                }, 500)    
            })
        }

     
            {/* Deletar produtos*/ }
        const PedidoProdutoDelete = async (pedido_produtoId) => { 
        console.log(pedido_produtoId)      
            await axios.delete(Api + "/pedido_produto/" + pedido_produtoId).then(resultado => {
                setData(data.filter(pedido => pedido.pedidoId !== resultado.data))              
                setUpdateData(true)
            }).catch(erro => {
               console.log('não excluido')
            })
        }

            {/* Lista de produtos*/ }
        const produtoGet = async () => {    
            if(pedidoSelecionado.motivo == 'Reposição' || pedidoSelecionado.motivo == 'Ampliação' || pedidoSelecionado.motivo == 'Novo cliente'){
                await axios.get(Api + "/produtos")
                .then(resultado => { setProdutos(resultado.data.filter(produtoSelecionado =>  produtoSelecionado.item == 'Itens de Escritório'&&
                produtoSelecionado.nome.toUpperCase().match(pesquisa.toUpperCase())))  
                }).catch(error => {
                    console.log(error);
                });              
            }else if(pedidoSelecionado.motivo == 'Suporte Infra - Predial'){
                await axios.get(Api + "/produtos")
                .then(resultado => { setProdutos(resultado.data.filter(produtoSelecionado => (produtoSelecionado.item == ('Itens de Limpeza') || produtoSelecionado.item == ('Materiais de Infra')) &&
                produtoSelecionado.nome.toUpperCase().match(pesquisa.toUpperCase())))  
                }).catch(error => {
                    console.log(error);
                });              
            }else if(pedidoSelecionado.motivo == 'Suporte Infra - TI'){
                await axios.get(Api + "/produtos")
                .then(resultado => { setProdutos(resultado.data.filter(produtoSelecionado => (produtoSelecionado.item == ('Itens de Escritório') || produtoSelecionado.item == ('Itens de Informatica')) &&
                produtoSelecionado.nome.toUpperCase().match(pesquisa.toUpperCase())))  
                }).catch(error => {
                    console.log(error);
                });              
            }else if(pedidoSelecionado.motivo == 'Compras'){
                await axios.get(Api + "/produtos")
                .then(resultado => { setProdutos(resultado.data.filter(produtoSelecionado => produtoSelecionado.nome.toUpperCase().match(pesquisa.toUpperCase())))  
                    
                }).catch(error => {
                    console.log(error);
                });
                if (pedidoSelecionado.nome.toUpperCase != pesquisa.toUpperCase){
                    setMsg('NaoEncontrado');
                }  
            }else{
                await axios.get(Api + "/produtos")
                .then(resultado => { setProdutos(resultado.data.filter(produtoSelecionado => produtoSelecionado.nome.toUpperCase().match(pesquisa.toUpperCase())))  
                    
                }).catch(error => {
                    console.log(error);
                });
            }
        }
        pedidoSelecionado.pedidoId = pedidoProdutoSelecionado.pedidoId;

        {/* Realizar novo pedido*/ }
    async function sendEmail(e) {
        pedidoSelecionado.pedidoId = codPedido
        e.preventDefault();
        if (!pedidoSelecionado.cliente || !pedidoSelecionado.motivo ){
            setMsg('Vazio');
            setTimeout(() => { setMsg(false) }, 4000)
        }else {
            await axios.post(Api + "/pedido", pedidoSelecionado).then(resultado => {
                    setData(data.concat(resultado.data));
                    setTimeout(() => { abrirFecharModalIncluir(); }, 2000)
                    setMsg('Sucesso')
                    setTimeout(() => { setMsg(false); }, 7000)
                }).catch(error => {
                    setMsg('Erro');
                    setTimeout(() => { setMsg(false); }, 5000)
                    setCarregando(0)
                })
            /*emailjs.sendForm('service_9prbi16', 'template_8j3l5sp', e.target, 'user_YAUxu9X6OKBpymMEycXrq')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            e.target.reset();*/
        };
    }
           {/* Lista de clientes*/ }
    const clienteGet = async () => {
        await axios.get(Api + "/clientes",).then(resultado => {
            setCliente(resultado.data)
        }).catch(error => {
            console.log(error);
        })   
    }
    
    useEffect(() => {
        if (updateData || pesquisa) {
            clienteGet();
            produtoGet();
            GetProduto();
            setUpdateData(false);              
        }
    }, [updateData, pesquisa]);

    const valueBase = { produto: '', quantidade: '' };
    const [listProdutos, setListProdutos] = useState([{ ...valueBase }]);

    {/* Adicionar um produto a lista de pedidos */ }
    function handleAdd() {
        setListProdutos(state => [...state, { ...valueBase }]);
    }
    {/* Excluir um produto da lista de pedidos*/ }
    const handleDelete = (ix) => {
        let values = listProdutos.filter((a, b) => {
            if (b !== ix) {
                return a;
            } else {
                return b;
            }
        }); setListProdutos(state => [...values]);
    }
    
  return (
    <> 
    <div className="mensagem-tela">
        {msg === 'Sucesso' && <p className="mensagem text-center p-1  alert alert-success"><i class="fas fa-check-circle "></i>&#160;Pedido realizado com sucesso!</p>}  
    </div> 
     <label onClick={abrirFecharModalIncluir} type="button" class="btn btn-novo btn-primary" data-toggle="modal" data-target=".exampleModalToggleLabel">Novo</label>
        
        <div className="modal  exampleModalToggleLabel">        
            <div className="modal-dialog modal-lg">
                <div className="modal-content  text-dark p-4 border">
                    <label data-toggle="modal" data-target=".exampleModalToggleLabel" onClick={abrirFecharModalIncluir}  class=" fechar-modal mb-5"><i class="modal-fechar fs-2 fas fa-times-circle"></i>&#160;&#160;&#160;&#160;&#160;&#160;</label>
                    <form onSubmit={sendEmail} class="form row g-3 border">
                        <div className="border-bottom foto-modal">
                            <img className="fotoLogo" src={fotoLogo}/>&#160;&#160;&#160;&#160;&#160;&#160;<h5 className="h5-modal">Novo Pedido Teste</h5>
                        </div>
                        <div className="mensagem-tela">
                            {msg === 'Erro' && <p className=" mensagem rounded text-center p-1 lert alert-danger " ><i class="fas fa-exclamation-triangle "></i> &#160;Não foi possível concluir o pedido.</p>}
                            {msg === 'Vazio' && <p className="mensagem p-1 text-center my-0 alert alert-warning" ><i class="fas fa-exclamation-triangle "></i> &#160;Digite os campos obrigatórios.</p>}
                        </div>                       
                        <div class="input-topo col-md-8">
                            <input value={pedidoSelecionado.nome} name="nome" type="text" className=" d-none input-border form-control" />
                            <input value={pedidoSelecionado.pedidoId} name="pedidoId" type="text" className=" d-none input-border form-control" />
                            <input value={pedidoSelecionado.email} name="email" type="text" className=" d-none input-border form-control" />
                            <nobr> <label class="overflow-hidden" name="nome" type="text" className=" input-border form-control" >{pedidoSelecionado.nome}</label></nobr>
                        </div>
                        <div class="input-topo col-md-4">
                            <label  name="areaSolicitante" type="text" class="input-border form-control">{pedidoSelecionado.areaSolicitante}</label> 
                        </div>
                        <div class="input-topo col-md-6">
                            <label for="inputEmail4" class="form-label">Cliente / Operação <span className="text-danger "> *</span></label>
                            <select onChange={handleChange} name="cliente" type="text" class="form-select">
                                <option selected>Selecione uma opção</option>
                                {cliente.map(item => ( <><option> { item.departamento }</option></> ))}
                            </select>
                        </div>
                        <div class="input-topo col-md-6">
                            <label for="inputEmail4" class="form-label">Data da Solicitação</label>
                            <input  disabled  value={datas} type="text"  className="form-control" />
                        </div>
                        <div class="col-sm mt-3">
                            <label for="inputZip" class="form-label">Motivo da solicitação<span className="text-danger "> *</span></label>                          
                            <select onChange={handleChange} name="motivo" id="inputState" className="form-select" >
                                <option disabled selected>Selecione</option>
                                <option>Abertura de Chamado - Operacional</option>
                                <option>Abertura de Chamado - Predial</option>
                                <option>Abertura de Chamado - Outros Motivos</option>
                                <option>Reposição</option>
                                <option>Ampliação</option>
                                <option>Novo cliente</option>
                            </select>      
                            {(pedidoSelecionado.motivo != 'Abertura de Chamado' & pedidoSelecionado.motivo != false) ? <>              
                            <div className=" list-produto d-flex row ">  
                                <div className="col-md-5 mt-1 mb-2">
                                <label for="inputZip" class="form-label">Selecionar Itens</label> 
                                    <nobr><label type="text" className="form-control text-center">{  selecionar  ? selecionar : <> Itens...</>}<input className=" d-none " type="checkbox" data-toggle="collapse"  data-target='#pesquisar'/></label></nobr>
                                   
                                    <div  className="collapse" id='pesquisar'>                          
                                        <div className="pesquisaProduto  row">                         
                                            <input onChange={(e) => setPesquisa(e.target.value)}  value={pesquisa} type="search" className="form-control text-center barraPesquisa " placeholder="Pesquisar..."/>
                                            {produtos.map(item =>(<><nobr><label onChange={(e) => setSelecionar(e.target.value)} className="" >{item.nome}
                                            <input data-toggle="collapse"  data-target='#pesquisar' onChange={handleChange2}  name='nome_produto' className="d-none" value={item.nome} type="radio" /></label></nobr></>))}   
                                        </div>   
                                      
                                    </div>                     
                                </div>
                                <div className="col-md-2 "> 
                                    <label class="form-label">Quantidade</label>
                                    <input name='quantidade' type="number"  placeholder="Quantidade" className="  form-control" onChange={handleChange2} />
                                </div>
                                <label onClick={()=>SalvarProduto()} className="btn btn-primary salvarProdutos mt-4 btn-sm" >Adicionar</label>
                                <div className="estoqueAtual col-md-3"> 
                                {produtos.map(item =>(<> { item.nome === selecionar  && <>
                                    <label className="mt-4">Estoque atual: <span className={item.estoque_atual === 0 ? "text-danger" :''}>{item.estoque_atual}</span></label>      
                                </> } </>))}           

                                </div>
                            </div> </>  : " " }
                            <div className="border p-3">
                                <label>Produtos selecionados: &#160;</label>
                                {data.map(item =>(<> 
                                {item.pedidoId == codPedido && <> 
                                    <label className="mt-2 btn produtosSelecionados mx-1" >&#160;  {item.quantidade} - {item.nome_produto}&#160;<i onClick={()=> PedidoProdutoDelete(deleteProduto)} for="nome" class="text-danger far fa-times-circle">
                                        <input className="d-none" onChange={(e) => setDeleteProduto(e.target.value)} value={item.pedido_produtoId} id="nome" type='checkbox' /></i>&#160;&#160;</label>
                                </>}</> ))}{console.log(deleteProduto)}
                            </div>      
                        </div>              
                        <div class="col-md-12">
                            <label for="inputZip" className="form-label">Comentários</label>
                            <textarea onChange={handleChange} name="observacoes" type="text" className="form-control" />
                        </div>
                        <div class="col-sm">
                            <label for="inputZip" className="form-label">Destinatário</label>
                            <textarea onChange={handleChange} name="destinatario" type="text" className="form-control" placeholder="Digite o nome das pessoas que receberão estes itens." />
                        </div>
                        <ModalFooter> 
                            {carregando ? <button className="btn btn-secondary " type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                                :<button className=" btn btn-primary" data-toggle={pedidoSelecionado.motivo && "modal"}  data-target={pedidoSelecionado.cliente && ".modal"} type="submit">Cadastrar</button>}
                            <button data-toggle="modal" data-target=".exampleModalToggleLabel" onClick={abrirFecharModalIncluir} className=" btn  btn-danger" type="button">Cancelar</button>
                        </ModalFooter>
                    </form>
                </div>
            </div>
        </div> 
    </>
  );
}
export default Teste;

