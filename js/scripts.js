

function consultaCEP() {
    let valor = document.querySelector('#cep').value;

    //O campo deverá ter 8 algarismos
    if (valor.length !== 8) {
        alert('CEP invalido!');
        return;
    }

    //Variavel que armazenará o API consumido / A variavel ${valor} é o CEP informado
    let url = `https://viacep.com.br/ws/${valor}/json/`;

    // Conversão para objeto ( irá converter os dados obtidos pela API em um obj)
    fetch(url).then(function (response) {
        //Como resposta, será chamado a função "mostrarEndereço" com os dados já definidos
        response.json().then(mostrarEndereco);

    });

}


// Apresentar dados para o usuario.
function mostrarEndereco(dados) {

    //Caso não encontre
    if (dados.erro) {
        resultado.innerHTML = "Não foi possivel localizar endereço!";
    }
    //Caso sim;
    else {
        let resultado = document.querySelector('#resultado');

        /* O innerHTML pode ser usado para receber o conteúdo de um elemento HTML
           ou para definir um novo conteúdo para ele */
        resultado.innerHTML =
            `< div class="result" >
             <p>Endereço:    ${dados.logradouro} </p>
             <p>Complemento: ${dados.complemento}</p>
             <p>Bairro:      ${dados.bairro}</p>
             <p>Localidade:  ${dados.localidade} - ${dados.uf} </p>
             <p>DDD:         ${dados.ddd} </p>
             <p>IBGE:        ${dados.ibge} </p>
             </div > `

    }
}// end mostrarEndereco



//Gambiarra para encontrar lat e long nos objetos inacessiveis
function obterCoordenadas(dados) {

    //Caso não encontre
    if (dados.erro) {
        resultado2.innerHTML = "Não foi possivel obter coordenadas";
    }//Caso não tenha erros;

    else {
        //Tratar objetos para obter as coordendas
        var resourceSets = (dados.resourceSets[0])
        var resources = JSON.stringify(resourceSets);
        const splitado = resources.split(",")
        const latitude = parseFloat(splitado[8].replace('"coordinates":[', ''));
        const longitude = parseFloat(splitado[9].replace(']}', ''));
        
        var map = new Microsoft.Maps.Map('#myMap', {
            credentials: 'Al-Uhfb4PxqxpezghcDzpHTSWYtUUHKKdzzx4aDxh-PAYAqawEar5gQQ6uxd22wV',
            center: new Microsoft.Maps.Location(latitude, longitude),
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            zoom: 15
    
        });

    }//end else 

}//end obterCoordenadas




