//index.js
const Alexa = require('ask-sdk-core');

// constants
const WELCOME_MESSAGE = 'Welcome to Alexa Starbucks Magic Spell.\
        I can suggest some crazy starbucks magic spells!\
        You can ask me for some Magic Spell!';
const HELP_MESSAGE = 'Hello! I am Alexa for Starbucks Magic Spell. \
        I can recommend you some crazy orders known as Starbucks Magic Spells!\
        You inovke by saying... Suggest me something or Tell me a Magic Spell!';
const GOODBYE_TEXT = 'Have a nice drink. Goodbye!'

const LauchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = WELCOME_MESSAGE;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const MagicSpellInitHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.type === 'MagicSpellInitIntent'
            || handlerInput.requestEnvelope.request.type === 'AMAZON.YesIntent' 
            || handlerInput.requestEnvelope.request.type === 'AMAZON.StartOverIntent');
    },
    handle(handlerInput) {
        const speechText = 'Hello. Please tell me what kind of drink are you craving for now? ';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const GetChoicesForSpellHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.type === 'GetChoicesForSpellIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const choiceSlot = handlerInput.requestEnvelope.request.intent.slots.choice.value;
        const spell = getSpell(handlerInput, choiceSlot);

    }

}

function getSpell(handlerInput, choiceSlot) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    //if()
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name ==='AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = HELP_MESSAGE;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
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
        const speechText = GOODBYE_TEXT;

        return handlerInput.responseBuilder
            .speak(speechText)
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
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler,
                MagicSpellInitHandler,
                GetChoicesForSpellHandler
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

