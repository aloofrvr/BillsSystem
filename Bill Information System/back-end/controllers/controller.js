'use strict';

const db = require(__dirname + '/../lib/mysql');

exports.viewBills = (req, res, next) => {
	const queryline = 'select * from BILL where ' + req.query.key + '="' + req.query.value + '"';
	console.log(queryline);
	db.query(queryline,[],(err, result) => {
		res.send(result);
	})
};

exports.viewSenator = (req, res, next) => {
	const queryline = 'select * from SENATOR where ' + req.query.key + '="' + req.query.value + '"';
	console.log(queryline);
	db.query(queryline,[],(err, result) => {
		res.send(result);
	})
};

exports.fileBillForSenator=(req,res,next)=>{
	let queryline;

	let arrayofSubjects = req.body.subjects.split(';');
	for (let i = 0 ; i < arrayofSubjects.length ; i++){
		queryline = "insert into BILL_SUBJECT values ('" + req.body.billno + "','" + arrayofSubjects[i] + "');"
		console.log(queryline);
		db.query(queryline,[],(err,result)=>{
			if (err) res.send(err);
		});
	}
	queryline = "call Filebillsenator ('"  + req.body.empno + "','" + req.body.billno + "','" + req.body.name + "',"  + req.body.year + ",'" + req.body.status + "','" + req.body.title + "','" + req.body.summdesc + "','" + req.body.content + "','" + req.body.primarycommittee + "','" + req.body.scope + "','" + req.body.secondarycommittee + "');";
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	});
};
exports.fileBillForHouseMem=(req,res,next)=>{
	let queryline;
	let arrayofSubjects = req.body.subjects.split(';');
	for (let i = 0 ; i < arrayofSubjects.length ; i++){
		queryline = "insert into BILL_SUBJECT values ('" + req.body.billno + "','" + arrayofSubjects[i] + "');"
		console.log(queryline);
		db.query(queryline,[],(err,result)=>{
			if (err) res.send(err);
		});
	}
	queryline = "call Filebillhousemem ('"  + req.body.empno + "','" + req.body.billno + "','" + req.body.name + "',"  + req.body.year + ",'" + req.body.status + "','" + req.body.title + "','" + req.body.summdesc + "','" + req.body.content + "','" + req.body.primarycommittee + "','" + req.body.scope + "','" + req.body.secondarycommittee + "');";
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	});
};
exports.deleteBills=(req,res,next)=>{
	const queryline="call DeleteBill('" + req.body.billno + "');"
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	})
}

exports.deleteSenator=(req,res,next)=>{
	const queryline="call DeleteSenator('" + req.body.empno + "');"
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	})
}

exports.updateBills = (req, res, next) => {
	const queryline = 'update BILL set ' + req.body.key + '="' + req.body.value + '" where Billno="' + req.body.billno + '"';
	console.log(queryline);
	db.query(queryline, [], (err, result) => {
		res.send(result);
	});
}

exports.updateSenator = (req, res, next) => {
	const queryline = 'update SENATOR set ' + req.body.key + '="' + req.body.value + '" where Employeenumber="' + req.body.empno + '"';
	console.log(queryline);
	db.query(queryline, [], (err, result) => {
		res.send(result);
	});
}

exports.getAllbills = (req, res, next) => {
	const queryline = 'select * from BILL';
	db.query(queryline, [], (err, result) => {
		res.send(result);
	});
}

exports.mainPage = (req, res, next) => {
	res.send("Welcome to Home Page");
}

exports.getSubjects = (req, res, next) => {
	const queryline = "select * from BILL_SUBJECT;";
	db.query(queryline, [], (err, result) => {
		res.send(result);
	});
}

exports.getSenators = (req, res, next) => {
	const queryline =  "select * from SENATOR;";
	db.query(queryline,[],(err, result) => {
		if (err) res.send(err);
		else res.send(result);
	});
}

exports.getHouseMems = (req, res, next) => {
	const queryline =  "select * from HOUSEMEMBER;";
	db.query(queryline,[],(err, result) => {
		if (err) res.send(err);
		else res.send(result);
	});
}

exports.getCommittees = (req, res, next) => {
	const queryline =  "select * from SENATOR_COMMITTEE;";
	db.query(queryline,[],(err, result) => {
		if (err) res.send(err);
		else res.send(result);
	});
}

exports.addSenator = (req, res, next) => {
	let queryline;
	let arrayOfComm = req.body.committee.split(';');
	for (let i = 0 ; i < arrayOfComm.length ; i++){
		queryline = "insert into SENATOR_COMMITTEE values ('" + req.body.empno + "','" + arrayOfComm[i] + "');"
		console.log(queryline);
		db.query(queryline,[],(err,result)=>{
			if (err) res.send(err);
		});
	}
	queryline = "insert into SENATOR values ('"  + req.body.empno + "','" + req.body.name + "');";
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	});
}
