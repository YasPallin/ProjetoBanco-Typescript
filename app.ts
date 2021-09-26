var express = require("express");
const app = express();
var mysql = require("mysql");
var con = mysql.createConnection({
	host: "localhost",
	user: "user",
	password: "user",
	database: "soulBanco",
});
const port = 8000;
app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// rota para página inicial - index
app.get("/", (req: any, res: any) => {
	res.render("index");
});

// interface da tranferência
interface TransacaoProps {
	id_conta: string;
	data: Date;
	valor: number;
	banco: string;
	agencia: string;
	conta: string;
	digito: string;
	tipo: string;
};

// classe da transferência
class Transferencia implements TransacaoProps {
	id_conta!: string;
	data!: Date;
	valor!: number;
	banco!: string;
	agencia!: string;
	conta!: string;
	digito!: string;
	tipo!: string;
	// onde constrói o objeto
	constructor(id_conta: string, valor: number, banco: string, agencia: string, conta: string, digito: string, tipo: string) {
		this.id_conta = id_conta;
		this.data = new Date();
		this.valor = valor;
		this.banco = banco;
		this.agencia = agencia;
		this.conta = conta;
		this.digito = digito;
		this.tipo = tipo;
	}
	// método de transferir da conta para outra
	transferirDinheiro() {
		let saldo: number = 5000;
		var sql_transferencia = `INSERT INTO transacao (cliente_conta, data_transacao, valor_transacao, banco_transacao, agencia_transacao, conta_transacao, digito_transacao, tipo_transacao) VALUES ('${this.id_conta}', '${this.data}', ${this.valor}, '${this.banco}', '${this.agencia}', '${this.conta}', '${this.digito}', ''${this.tipo})`;
		var sql_edita_saldo = `UPDATE conta SET saldo_cliente = saldo_cliente - ${this.valor} WHERE cliente_conta = '${this.id_conta}'`;

		con.query(sql_transferencia, function (err: any, res: any) {
			if (err) throw err;
			con.query(sql_edita_saldo, function(err: any, res: any) {
				if (err) throw err;
				res.redirect("/extrato");
			});
		});
	};
};


// rota para cadastrar transferência
app.get("/cadastrarTransf", (req: any, res: any) => {
	res.render("formTransferencia");
});

app.post("/cadastrarTransf", (req: any, res: any) => {
	let transacao = new Transferencia('0', req.body.valor_transf, req.body.banco_transf, req.body.agencia_transf, req.body.conta_transf, req.body.digito_transf, req.body.tipo_conta_transf);
	transacao.transferirDinheiro();
});


// rota para listar transações no extrato
app.get("/extrato", (req: any, res: any) => {
	let listar_transferencias = "SELECT * FROM transacao"
	con.query(listar_transferencias, function (err: any, result: any) {
		if (err) throw err;
		res.render("extrato", { tranferenciasLista: result })
	});
});


// porta
app.listen(port, () => {
	console.log("Servidor rodando na porta " + port);
});
