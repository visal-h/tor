const connectButton = document.getElementById('connect');
const depositForm = document.getElementById('deposit-form');
const depositAddress = document.getElementById('address');
const depositAmount = document.getElementById('amount');
const depositButton = document.getElementById('deposit');

let web3;
let accounts = [];

async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);

    try {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      depositForm.style.display = 'block';
    } catch (error) {
      console.error('User denied account access', error);
    }

    window.ethereum.on('accountsChanged', async (newAccounts) => {
      accounts = newAccounts;
    });
  } else {
    console.log('No MetaMask detected');
  }
}

async function depositEther() {
  if (accounts.length === 0) {
    console.error('No connected accounts');
    return;
  }

  const fromAddress = accounts[0];
  const toAddress = depositAddress.value;
  const amount = web3.utils.toWei(depositAmount.value, 'ether');

  try {
    const transaction = await web3.eth.sendTransaction({
      from: fromAddress,
      to: toAddress,
      value: amount,
    });
    console.log('Transaction Hash:', transaction.transactionHash);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}

connectButton.addEventListener('click', connectMetaMask);
depositButton.addEventListener('click', depositEther);
