

export function useMainMenuValidators(){

    const validateWithdraw = (value, fundsValue, setWithdrawError) => {
        if (value > fundsValue) {
            setWithdrawError(true);
        }
        else {
            setWithdrawError(false);
        }
    }

    return {validateWithdraw};
}