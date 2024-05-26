import {useApiService} from "../core/ApiService";

export function useCancelPendingHandlers() {

    const {cancelBuyStockPending, cancelSellStockPending} = useApiService();

    const handleCancelOrder = (stock, handleClose) => {
        if(stock.status === 'BOUGHT') {
            try {
                cancelBuyStockPending(stock)
                    .then(response => {
                        if (response.status === 200) {
                            handleClose();
                            window.location.reload();
                        }
                    });
            }
            catch (error) {
                console.error('Error cancelling buy order:', error);
            }
        }
        else {
            try{
                cancelSellStockPending(stock)
                    .then(response => {
                        if (response.status === 200) {
                            handleClose();
                            window.location.reload();
                        }
                    });
            }
            catch(error){
                console.error('Error cancelling sell order:', error);
            }
        }
    }

    return {
        handleCancelOrder
    }
}