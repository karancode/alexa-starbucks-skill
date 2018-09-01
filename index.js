//index.js
const Alexa = require('ask-sdk-core');




const LauchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to Alexa Starbucks Magic Spell Skill!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntentHandler';
    },
    handle(handlerInput) {
        const speechText = 'Hello world';
        console.log("actaul array->: ", magicSpells[getRandom(magicSpells.length)])

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name ==='AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!'

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //cleanup logic
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle(){
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled : ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    }
};


// constants
const magicSpells = [
    'Order One',
    'Order Two',
    'Order Three',
    'Order Four',
    'Order Five'
];

function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


let skill;

exports.handler = async function (event, context) {
    console.log(`REQUEST++++${JSON.stringify(event)}`);

    if(!skill){
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LauchRequestHandler,
                HelloWorldIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler
            )
            .addErrorHandlers(
                ErrorHandler
            )
            .create();
    }

    const response = await skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);

    return response;
};

//for AWS Lambda
/*
 exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LauchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .lambda();
*/

