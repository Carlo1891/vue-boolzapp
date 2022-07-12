// Descrizione:
// Realizziamo la struttura dell'esercizio come lo screenshot, strutturando tutte le parti necessarie in maniera il più possibile ordinata,
// concentrandoci nello specifico su:
// Replica della grafica, con l'aggiunta possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto presente nella struttura dati consegnata.

new Vue({
    el: '#app',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],

        // Risposte casuali prova
        answer: [
            'Lascia sta che ho una giornata', 'Ehi! Come va?', 'Che ne so?', 'Eh vabbè lallero', 'Stasera quindi libetta!',
            'Ma chi sei?', 'Buongiorno', 'Hai fatto i soldi si che non rispondi più!' 
        ],
    currentIndex: 0,
    temporaryMex: '',
    searchName: '',
    notify: true,
    modale: null,
},
methods: {
    // con questo metodo, quando clicco su un contatto visualizzo la chat corrispondente (setto currentIndex allo stesso valore dell'indice dei contatti)
    changeChat: function(index) {
        this.currentIndex = index
        this.modale = null;
    },

    // con questo metodo se la v:modal data all'input della chat è diversa da una stringa vuota pusho la stringa in un oggetto(con data e status)
    sendMessage: function(index){
        if (this.temporaryMex !== ''){
        this.contacts[index].messages.push({ date: this.getDate(), message: this.temporaryMex, status: 'sent'});
        this.temporaryMex = '';
        this.answerMessage(index);
        this.scrollToEnd();
        }
    },

    // con questo metodo pusho le risposte random dopo un secondo dall'invio del messaggio (inserito in sendMessage)
    answerMessage: function(index) {
        setTimeout(()=>{
            let rand = Math.floor(Math.random()*this.answer.length);
            this.contacts[index].messages.push({ date: this.getDate(), message: this.answer[rand], status: 'received'});
         },1000);
    },

    // con questo metodo porto lo scroll all'ultimo messaggio visualizzato (inserito in sendMessage)
    scrollToEnd: function() {  
        setTimeout(()=>{
        let container = this.$el.querySelector(".chat-bg");
        container.scrollTo(0, container.scrollHeight)
    },1200);
    },

    // con questo metodo e la libreria dayJs creo ora e data dinamici, (inserito in sendMessage e answerMessage)
    getDate() {
        return dayjs().format('DD/MM/YYYY  HH:mm:ss')
    },

    // con questo metodo creo una funzione che individua l'ultimo messaggio della chat
    // (utilizzato per aggiungere dinamicamente il giorno e l'ora dell'ultimo accesso del contatto)
    getLastAccess: function(index) {  
        let lastMex= this.contacts[index].messages.length -1;
        return this.contacts[index].messages[lastMex].date;
    },

    // con questo metodo setto la modale in false se è uguale all'indice del messaggio, quindi se aperta (= all'indice) si chiude, se è chiusa (=false) si apre
    openModal(index){
        if(this.modale === index){
            this.modale = false;
        } else {
            this.modale = index;
        }
    },
    // cancellazione dei messaggi
    deleteMex(index){
        this.contacts[index].messages.splice(this.modale, 1)
        this.modale = null;
    }
},
});