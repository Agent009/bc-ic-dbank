import React, { useState, useEffect } from "react";
import { dbank_backend } from '@declarations/dbank_backend';
import { useAppContext } from '@lib/AppContext';

function Bank() {
    const [inputAmount, setInputAmount] = useState(0);
    const [outputAmount, setOutputAmount] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const { setBalance } = useAppContext();
    console.log("Bank -> init -> inputAmount", inputAmount, "outputAmount", outputAmount);
    
    useEffect(() => {
        const load = async () => {
            console.log("Bank -> Finished loading");
            await update();
        };

        load();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("Bank -> handleSubmit");
        event.preventDefault();
        setDisabled(true);

        if (inputAmount > 0) {
            await dbank_backend.topUp(inputAmount);
            console.log("Bank -> handleSubmit -> topUp successful");
        }

        if (outputAmount > 0) {
            await dbank_backend.withdraw(outputAmount);
            console.log("Bank -> handleSubmit -> withdraw successful");
        }

        await dbank_backend.compound();
        console.log("Bank -> handleSubmit -> compound successful");
        await update();
        setInputAmount(0);
        setOutputAmount(0);
        setDisabled(false);
    };

    const update = async () => {
        const currentAmount = await dbank_backend.checkBalance();
        const newBalance = Math.round(currentAmount * 100) / 100;
        console.log("Bank -> update -> newBalance", newBalance);
        setBalance(newBalance);
        console.log("Bank -> update -> balance updated");
    };

    return (
        <form action="#" onSubmit={handleSubmit}>
            <h2>Amount to Top Up</h2>
            <input 
                id="input-amount" 
                type="number" 
                step="0.01" 
                min={0} 
                name="topUp" 
                value={inputAmount} 
                onChange={(e) => setInputAmount(parseFloat(e.target.value))} 
            />
            <h2>Amount to Withdraw</h2>
            <input 
                id="withdrawal-amount" 
                type="number" 
                name="withdraw" 
                step="0.01" 
                min={0} 
                value={outputAmount} 
                onChange={(e) => setOutputAmount(parseFloat(e.target.value))} 
            />
            <input id="submit-btn" type="submit" disabled={disabled} value="Finalise Transaction" />
        </form>
    );
}

export default Bank;
