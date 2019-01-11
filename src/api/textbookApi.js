import { config } from '../config.js';

export class TextbookApi {

    getSchools(search) {
        var destUrl = config.apiUrl + '/schools';
        if(search !== undefined) {
            destUrl = destUrl + '?find=' + search;
        }

        return fetch(destUrl,
        {
    	    method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            //console.warn(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
    }

    getClasses(id) {
        var destUrl = config.apiUrl + '/classes/' + id;
  
        return fetch(destUrl,
        {
    	    method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            //console.warn(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
    }

    getTextbooks(id) {
        var destUrl = config.apiUrl + '/textbooks/' + id;
  
        return fetch(destUrl,
        {
    	    method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            //console.warn(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
    }

    orderTextbooks(order) {
        var destUrl = config.apiUrl + '/order';
  
        return fetch(destUrl,
        {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            //console.warn(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
    }
    
}
