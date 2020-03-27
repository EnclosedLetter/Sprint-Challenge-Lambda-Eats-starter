import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required()
        .min(2, "Name must be longer than 2 letters.")
});
        

export default function Form (){
    const [ button, setButton ] = useState(true); //1) Make a state for button that won't let you move forward until everything is filled out.


};