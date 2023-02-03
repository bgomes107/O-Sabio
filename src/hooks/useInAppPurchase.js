import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { requestPurchase, useIAP } from 'react-native-iap';
import {
    STORAGE_KEYS,
    storeBooleanData,
    getBooleanData
} from "../functions/asyncStorage";

const { IS_FULL_APP_PURCHASED } = STORAGE_KEYS;

// Play Store item ids
const itemSKUs = Platform.select({
    android: ['full_app', 'test_4'],
});

export const useInAppPurchase = () => {

    const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);
    const [connectionErrorMsg, setConnectionErrorMsg] = useState('');

    const {
        connected,
        products,
        getProducts,
        finishTransaction,
        currentPurchase,
        currentPurchaseError,
    } = useIAP();

    // Get data after initial render
    useEffect(() => {
        getBooleanData(IS_FULL_APP_PURCHASED).then(data => {
            setIsFullAppPurchased(data);
        })
    }, []);

    // Get products from play store.
    useEffect(() => {
        if (connected) {
            getProducts(itemSKUs);
            console.log('Obtendo produtos...');
        }
        console.log(products);

    }, [connected, products]);

    // currentPurchase will change when the requestPurchase function is called. The purchase then needs to be checked and the purchase acknowledged so Google knows we have awared the user the in-app product.
    useEffect(() => {
        const checkCurrentPurchase = async purchase => {
            if (purchase) {
                const receipt = purchase.transactionReceipt
                console.log("RECEIPT: ", receipt)
                if (receipt) {
                    // Give full app access
                    setAndStoreFullAppPurchase(true)
                    try {
                        const ackResult = await finishTransaction(purchase)
                        console.log("ackResult: ", ackResult)
                    } catch (ackErr) {
                        // We would need a backend to validate receipts for purhcases that pended for a while and were then declined. So I'll assume most purchase attempts go through successfully (OK ackResult) & take the hit for the ones that don't (user will still have full app access).
                        console.log("ackError: ", ackErr)
                    }
                }
            }
        }
        checkCurrentPurchase(currentPurchase)
    }, [currentPurchase, finishTransaction])

    // If user reinstalls app, then they can press purchase btn (SettingsScreen) to get full app without paying again.
    useEffect(() => {
        if (currentPurchaseError) {
            if (
                currentPurchaseError.code === "E_ALREADY_OWNED" &&
                !isFullAppPurchased
            ) {
                setAndStoreFullAppPurchase(true)
            }
        }
    }, [currentPurchaseError]);


    const purchaseFullApp = async () => {
        // Reset error msg
        if (connectionErrorMsg !== "") setConnectionErrorMsg("");
        if (!connected) {
            setConnectionErrorMsg("Por favor, verifique sua conexão com a internet");
        }
        // If we are connected & have products, purchase the item. Google will handle if user has no internet here.
        else if (products?.length > 0) {
            requestPurchase(itemSKUs[1]);
            console.log("Comprando produtos...");
        }
        // If we are connected but have no products returned, try to get products and purchase.
        else {
            console.log("Sem produtos. Tentando encontrar algum...");
            try {
                await getProducts(itemSKUs);
                requestPurchase(itemSKUs[1]);
                console.log("Há produtos, comprando agora...");
            } catch (error) {
                setConnectionErrorMsg("Por favor, verifique sua conexão com a internet");
                console.log("Falhou. Erro: ", error);
            }
        }
    }

    const setAndStoreFullAppPurchase = boolean => {
        setIsFullAppPurchased(boolean);
        storeBooleanData(IS_FULL_APP_PURCHASED, boolean);
    }

    return {
        isFullAppPurchased,
        connectionErrorMsg,
        purchaseFullApp
    }
}