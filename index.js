//index.js
const Alexa = require('ask-sdk-core');

// constants
const WELCOME_MESSAGE = 'Welcome to Alexa Starbucks Magic Spell.\
        I can suggest some crazy starbucks magic spells!\
        You can ask me for some Magic Spell!';
const HELP_MESSAGE = 'Hello! I am Alexa for Starbucks Magic Spell. \
        I can recommend you some crazy orders known as Starbucks Magic Spells!\
        You inovke by saying... Suggest me something or Tell me a Magic Spell!';
const GOODBYE_MESSAGE = 'Have a nice drink. Goodbye!'
const MAGICSPELL_INIT_MESSAGE = 'Would you like a Hot or a Cold drink ?';
const MAGICSPELL_PREF_MESSAGE = 'Would like Chocolate, Mocha, Vanilla or Mango ?';


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
        const speechText = MAGICSPELL_INIT_MESSAGE;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const GetTypeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.type === 'GetTypeIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const drink_type = handlerInput.requestEnvelope.request.slots.drink_type.value;
        attributes.drink_type = drink_type;
        handlerInput.attributesManager.setSessionAttributes(attributes);

        const speechText = MAGICSPELL_PREF_MESSAGE;
        return handlerInput.response
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const GetPrefIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.type === 'GetPrefIntent';
    },
    handler(handlerInput) {
        //const attributes = handlerInput.attributesManager.getSessionAttributes();
        const pref_type = handlerInput.requestEnvelope.request.slots.pref_type.value;
        //attributes.pref_type = pref_type;
        //handlerInput.attributesManager.setSessionAttributes(attributes);

        const speechText = getMagicSpell(pref_type, handlerInput);
        return handlerInput.response
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

function getMagicSpell(pref_type, handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const spell;
    switch(pref_type){
        case 'chocolate':
            if(attributes.drink_type === 'cold'){
                spell = 'Cold Chocolate Maigc Spell!';
            }else if(attributes.drink_type === 'hot'){
                spell = 'Hot Chocolate Maigc Spell!';
            }
            break;
        case 'vanilla':
        if(attributes.drink_type === 'cold'){
            spell = 'Cold Vanilla Maigc Spell!';
        }else if(attributes.drink_type === 'hot'){
            spell = 'Hot Vaniila Maigc Spell!';
        }
            break;
        case 'mango':
            if(attributes.drink_type === 'cold'){
                spell = 'Cold Mango Maigc Spell!';
            }else if(attributes.drink_type === 'hot'){
                spell = 'Hot Mango Maigc Spell!';
            }
            break;
        case 'mocha':
            if(attributes.drink_type === 'cold'){
                spell = 'Cold Mocha Maigc Spell!';
            }else if(attributes.drink_type === 'hot'){
                spell = 'Hot Mocha Maigc Spell!';
            }
            break;
        default:
            //return some random spell.
    }
    return spell;
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
        const speechText = GOODBYE_MESSAGE;

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
                GetTypeIntentHandler,
                GetPrefIntentHandler,
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

