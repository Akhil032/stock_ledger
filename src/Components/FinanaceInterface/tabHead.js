

export const tabDataDisplay =
{
    "SET_OF_BOOKS_ID": null,
    "ACCOUNTING_DATE": null,
    "CURRENCY": null,
    "TRN_DATE": null,
    "ITEM_EXCHANGE_RATE": null,
    "DEBIT_AMOUNT": null,
    "CREDIT_AMOUNT": null,
    "REF_NO_1": null,
    "REF_NO_2": null,
    "REF_NO_3": null,
    "REF_NO_4": null,
    "PRIMARY_ACCOUNT": null,
    "PRIMARY_CURR_CODE": null,
    "PRIMARY_DEBIT_AMT": null,
}
export const InterCompDescColumns = { "BILL_TO_ADDRESS": "BILL_TO_ID_DESC" }
const hiddenCols = ['BILL_TO_ID_DESC']

export const generateTableColumns = (data) =>
    Object.keys(data).map((key) => {
        if (!hiddenCols.includes(hiddenCols)) {
            if (key === "VPN") {
                return {
                    id: key,
                    label: key
                        .toUpperCase()
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                };
            } else {
                return {
                    id: key,
                    label: key
                        .toLowerCase()
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                };
            }
        }
    });

