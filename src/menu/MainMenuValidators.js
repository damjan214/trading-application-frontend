

export function useMainMenuValidators(){

    const validateWithdraw = (value, fundsValue, setWithdrawError) => {
        const hasLeadingZeros = value.match(/^0[0-9].*$/);

        if (value > fundsValue || value <= 0 || isNaN(value) || hasLeadingZeros) {
            setWithdrawError(true);
        }
        else {
            setWithdrawError(false);
        }
    }

    const validateDeposit = (value, setDepositError) => {
        const hasLeadingZeros = value.match(/^0[0-9].*$/);

        if(value <= 0 || isNaN(value) || hasLeadingZeros){
            setDepositError(true);
        }
        else {
            setDepositError(false);
            }
    }

    return {validateWithdraw, validateDeposit};
}