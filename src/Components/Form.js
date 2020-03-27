import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({ //2) set the text restrictions.
    name: yup //this will be our text input field
        .string()
        .required("Must input name before proceeding")
        .min(2, "Name must be longer than 2 letters."), //2 character min
    size: yup //we will be making this a drop down
        .string()
        .required("Must choose pizza size before proceeding."),
    instructions: yup //similar to the name, text input
        .string()
        .required("Must give us instructions on what you want"),
    toppings: yup //we will be making this a checklist
        .boolean()
        .oneOf([true], "Must choose one")


    
});
        

export default function Form (){
    const [ button, setButton ] = useState(true); //1) Make a state for button that won't let you move forward until everything is filled out.

    const [ formState, setFormState ] = useState({ //3 Set our form state
        name:"",
        seze:"",
        instructions:"",
        toppings:""

    })

    const [ errors, setErros ] = useState ({ //4) Set our error state
        name:"",
        size:"",
        instructions:"",
        toppings:""
    })
};