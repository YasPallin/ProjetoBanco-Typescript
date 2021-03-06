DROP DATABASE soulBanco;
CREATE DATABASE soulBanco;
USE soulBanco;


DROP TABLE IF EXISTS login_cliente;
DROP TABLE IF EXISTS conta;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS transacao;

CREATE TABLE IF NOT EXISTS clientes(
id_cliente INT NOT NULL AUTO_INCREMENT,
nome_cliente VARCHAR(11) NOT NULL,
endereco_cliente VARCHAR(30) NOT NULL,
cpf_cliente VARCHAR (11) NOT NULL,
PRIMARY KEY(id_cliente)
);

CREATE TABLE IF NOT EXISTS conta(
agencia_cliente VARCHAR(11) NOT NULL,
saldo_cliente FLOAT NOT NULL,
cliente_id INT NOT NULL,
conta_cliente VARCHAR(10) NOT NULL,
PRIMARY KEY(conta_cliente),
FOREIGN KEY (cliente_id) REFERENCES clientes(id_cliente)
);

CREATE TABLE IF NOT EXISTS login_cliente(
id_login INT NOT NULL AUTO_INCREMENT,
password VARCHAR(100) NOT NULL,
username VARCHAR(10) NOT NULL,
PRIMARY KEY(id_login),
FOREIGN KEY (username) REFERENCES conta(conta_cliente)
);

CREATE TABLE IF NOT EXISTS transacao(
id_transacao INT NOT NULL AUTO_INCREMENT,
data_transacao DATE NOT NULL,
destinatario VARCHAR (30) NOT NULL,
valor_transacao FLOAT NOT NULL,
cliente_conta VARCHAR(10) NOT NULL,
PRIMARY KEY(id_transacao),
FOREIGN KEY (cliente_conta) REFERENCES conta(conta_cliente)
);

INSERT INTO clientes(nome_cliente, endereco_cliente, cpf_cliente) VALUES ('maria', 'rua bom jesus, 54', '12345678954');
INSERT INTO clientes(nome_cliente, endereco_cliente, cpf_cliente) VALUES ('jose', 'rua do menino, 54', '23456789123');

INSERT INTO conta(agencia_cliente, saldo_cliente, cliente_id, conta_cliente) VALUES ('001', 1000, 1, '12345');
INSERT INTO conta(agencia_cliente, saldo_cliente, cliente_id, conta_cliente) VALUES ('002', 500, 2, '23456');

INSERT INTO login_cliente(password, username) VALUES ('$2b$10$9QjtbjzkkzsZ0choU2/GD..1xD8zG3wS3Sns/E7XSESc7pZypWpuy', '12345');
INSERT INTO login_cliente(password, username) VALUES ('$2b$10$B0tS5nfvUrO7dw9RAchV.ekawGgYyzcPrUDlqEp6isPMymnjXD/CC', '23456');

INSERT INTO transacao (data_transacao, destinatario, valor_transacao, cliente_conta) VALUES ('2021-09-24', 'amelia', 200, '12345');
INSERT INTO transacao (data_transacao, destinatario, valor_transacao, cliente_conta) VALUES ('2021-09-23', 'paulo', 230, '23456');

