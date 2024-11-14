import { useAppContext } from '@lib/AppContext';

function Balance() {
    const { balance } = useAppContext();

    return (
        <h1>Current Balance: $<span id="value">{balance}</span></h1>
    );
}

export default Balance;
