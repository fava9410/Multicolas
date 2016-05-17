$(document).ready(function(){
    var nombresProcesos = ["A","B","C","D","E","F","G","H","I","J","K","L"];
    var contador = 0, contadorProcesos = 0, quantum1 = 4, quantum2 = 5, quantum3 = 7;
    var ejecutando = [];
    //colas
    var q1=[], q2=[], q3=[], q4=[];



    $("#agregar").click(function(){   
        contadorProcesos++;     
        agregarQ1();
        llenarDatos(q1);
    });

    setInterval(proceso,1000);

    function guardarCola(dato){
        switch(dato.q){
            case 1:
                q1.push(dato);
                break;
            case 2:
                if(dato.rafaga > 0)
                    q2.push(dato);
                //organizar
                if(q1 != 0){
                    q1[0].llegada = contador;
                    llenarDatos(q1);
                    if (q2 != 0) {
                        q2[0].llegada = q1[q1.length-1].finalizacion;
                        llenarDatos(q2);
                    }
                    if (q3 != 0) {
                        q3[0].llegada = q2[q2.length-1].finalizacion;
                        llenarDatos(q3);
                    }
                    if (q4 != 0) {
                        q4[0].llegada = q3[q3.length-1].finalizacion;
                        llenarDatos(q4);
                    }
                    ejecutando.push(q1.shift());
                }
                else{
                    q2[0].llegada = contador;
                    llenarDatos(q2);
                    if (q3 != 0) {
                        q3[0].llegada = q2[q2.length-1].finalizacion;
                        llenarDatos(q3);
                    }
                    if (q4 != 0) {
                        q4[0].llegada = q3[q3.length-1].finalizacion;
                        llenarDatos(q4);
                    }
                    ejecutando.push(q2.shift());                    
                }
                break;
            case 3:
                if(dato.rafaga > 0)
                    q3.push(dato);
                //organizar
                if(q2 != 0){
                    q2[0].llegada = contador;
                    llenarDatos(q2);
                    if (q3 != 0) {
                        q3[0].llegada = q2[q2.length-1].finalizacion;
                        llenarDatos(q3);
                    }
                    if (q4 != 0) {
                        q4[0].llegada = q3[q3.length-1].finalizacion;
                        llenarDatos(q4);
                    }
                    ejecutando.push(q2.shift());
                }
                else{
                    q3[0].llegada = contador;
                    llenarDatos(q3);
                    if (q4 != 0) {
                        q4[0].llegada = q3[q3.length-1].finalizacion;
                        llenarDatos(q4);
                    }
                    ejecutando.push(q3.shift());                    
                }
                break;
            case 4:
                if(dato.rafaga > 0)
                    q4.push(dato);
                if(q3 != 0){
                    q3[0].llegada = contador;
                    llenarDatos(q3);
                    if (q4 != 0) {
                        q4[0].llegada = q3[q3.length-1].finalizacion;
                        llenarDatos(q4);
                    }
                    ejecutando.push(q3.shift());
                }
                else{
                    q4[0].llegada = contador;
                    llenarDatos(q4);
                    ejecutando.push(q4.shift());                    
                }
                break;
        }
    }

    function examinarQuantum(){
        var quantum;
        switch(ejecutando[0].q){
            case 1:
                quantum = quantum1;
                break;
            case 2:
                quantum = quantum2;
                break;
            case 3:
                quantum = quantum3;
                break;
        }
        if(ejecutando[0].rafaga != 0 && ejecutando[0].comienzo+quantum == contador){
            ejecutando[0].q++;
            guardarCola(ejecutando.shift());   
        }
    }

    function agregarQ1(){    
        q1.push({"proceso": nombresProcesos[contadorProcesos-1], "prioridad": Math.round(Math.random()*3+1), "llegada": contador, "rafaga": Math.round(Math.random()*8+4), "finalizacion": 0, "q": 1});  
    }

    function llenarDatos(cola){    
        for(var i=0; i<cola.length; i++){
            if(i == 0){
                cola[0].finalizacion = cola[0].llegada + cola[0].rafaga;     
            }
            else {
                cola[i].finalizacion = cola[i-1].finalizacion + cola[i].rafaga; 
            }
            if(ejecutando!=0){        
                cola[0].finalizacion = ejecutando[0].finalizacion + cola[0].rafaga;        
            }        
            cola[i].retorno = cola[i].finalizacion-cola[i].llegada;
            cola[i].espera = cola[i].retorno-cola[i].rafaga;
            cola[i].comienzo = cola[i].llegada+cola[i].espera;   
        }
    }

    function proceso(){ 
        if(ejecutando == 0 || contador == ejecutando[0].finalizacion){
            if(q1 != 0)
                ejecutando[0] = q1.shift();
            else{
                if(q2 != 0){
                    q2[0].llegada = contador;
                    llenarDatos(q2);
                    ejecutando[0] = q2.shift();
                }
                else{
                    if(q3 != 0){
                        q3[0].llegada = contador;
                        llenarDatos(q3);
                        ejecutando[0] = q3.shift();
                    }
                    else{
                        if(q4 != 0){
                            q4[0].llegada = contador;
                            llenarDatos(q4);
                            ejecutando[0] = q4.shift();
                        }
                        else
                            ejecutando.pop();
                    }
                }
            }
        }    
        if(ejecutando != 0)
            examinarQuantum();
        if(ejecutando != 0){
            ejecutando[0].rafaga--;
        }        
        console.log(contador);
        console.log("q1");
        for(var i=0; i<q1.length; i++){
            console.log(q1[i]);
        }
        console.log("q2");
        for(var i=0; i<q2.length; i++){
            console.log(q2[i]);
        }
        console.log("q3");
        for(var i=0; i<q3.length; i++){
            console.log(q3[i]);
        }
        console.log("ejecutando");
        for(var j=0; j<ejecutando.length; j++){
            console.log(ejecutando[j]);
        }

        contador++;
    }
});