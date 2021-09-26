interface Usuario {
    nome: string
    endereco: string
    cpf: number
    agencia: number
    saldo: number
    data: string
    destino: number
    valor: string
    senha: string
    usuario: string

}
class Cliente implements Usuario {
    nome: string
    endereco: string
    cpf: number
    agencia: number
    saldo: number
    data: string
    destino:number
    valor: string
    senha: string
    usuario: string


    constructor(nome: string, endereco: string, cpf: number, agencia: number, saldo: number, data: string, destino: number, valor: string, senha: string, usuario: string) {
        this.nome = nome
        this.endereco = endereco
        this.cpf = cpf
        this.agencia = agencia
        this.saldo = saldo
        this.data = data
        this.destino = destino
        this.valor = valor
        this.senha = senha
        this.usuario = usuario

    }
    escrevaPropriedade() {
        console.log(this.nome)
        console.log(this.cpf)
        console.log(this.endereco)
        console.log(  this.agencia)
        console.log(this.saldo)
        console.log(  this.data )
        console.log( this.destino)
        console.log( this.valor )
        console.log(this.senha)
        console.log( this.usuario)

    }

    getfirstName() {
        return this.nome;
    }

    setnome(nome: string) {
        this.nome = nome
    }
    getendereco() {
        return this.nome;
    }

    setendereco(endereco: string) {
        this.endereco = endereco
    }

    getcpf() {
        return this.cpf;
    }

    setcpf(cpf: number) {
        this.cpf = cpf;
    }

    getagencia() {
        return this.agencia;
    }

    setagencia(agencia: number) {
        this.agencia = agencia
    }



    getsaldo() {
        return this.saldo;
    }

    setsaldo(saldo: number) {
        this.saldo = saldo
    }
    getdata() {
        return this.data;
    }

    setdata(data: string) {
        this.data = data
    }
    getdestino() {
        return this.destino;
    }

    setdestino(destino: number){ 
        this.destino = this.destino
    }

    getvalor() {
        return this.valor;
    }

    setvalor(valor: string) {
        this.valor=valor
    }

    getsenha() {
        return this.senha;
    }

    setsenha(senha: string) {
        this.senha=senha
    }

    getusuario() {
        return this.usuario;
    }

    setusuario(usuario: string) {
        this.usuario=usuario
    }

    }
    let banco = new Cliente("mirian", "rua",154564615,1 , 10- -2011, "10", 2, "dez","mirian", "admin")

console.log(banco)
console.log()
    // banco.escreverPropriedade()

    // implementei todos os dados em uma unica interface
     
      

