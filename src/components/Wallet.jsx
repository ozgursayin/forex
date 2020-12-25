import React, { useState } from "react";

const Wallet = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    { value: "USD", text: "US Dollar", id: 1 },
    { value: "EUR", text: "Euro", id: 2 },
    { value: "GBP", text: "Pound Sterling", id: 3 },
    { value: "TRY", text: "Turkish Lira", id: 24 },
  ]);

  const [options, setOptions] = useState([
    // { value: "USD", text: "US Dollar" },
    // { value: "EUR", text: "Euro" },
    // { value: "GBP", text: "Pound Sterling" },
    // // { value: "BTC", text: "BTC" },
    // { value: "TRY", text: "Turkish Lira" },
    { value: "AUD", text: "Australian Dollar", id: 4 },
    { value: "SGD", text: "Singapore Dollar", id: 5 },
    { value: "BRL", text: "Brazilian Real", id: 6 },
    { value: "CAD", text: "Canadian Dollar", id: 7 },
    { value: "CHF", text: "Swiss Franc", id: 8 },
    { value: "DKK", text: "Denmark Kron", id: 9 },
    { value: "HKD", text: "Hong Kong Dollar", id: 10 },
    { value: "JPY", text: "Japanese Yen", id: 11 },
    { value: "SEK", text: "Swedish Kron", id: 12 },
    { value: "ISK", text: "Icelandic Kron", id: 13 },
    { value: "PHP", text: "Philippine Peso", id: 14 },
    { value: "HUF", text: "Hungarian Forint", id: 15 },
    { value: "CZK", text: "Czech Kron", id: 16 },
    { value: "INR", text: "Indian Rupee", id: 17 },
    { value: "CNY", text: "Chinese Yuan", id: 18 },
    { value: "NZD", text: "New Zealand Dollar", id: 19 },
    { value: "MXN", text: "Mexican Peso", id: 20 },
    { value: "ILS", text: "Israeli Shekel", id: 21 },
    { value: "IDR", text: "Indonesian Rupiah", id: 22 },
    { value: "RUB", text: "Russian Ruble", id: 23 },
  ]);
  return (
    <div>
      <h1>Wallet</h1>
    </div>
  );
};

export default Wallet;
