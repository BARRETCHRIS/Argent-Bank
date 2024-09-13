const BalancesCard = ({ balance }) => {
    return (
        // <div className="balance-card">
        //     <h3>{balance.title}</h3>
        //     <p className="amount">${balance.amount}</p>
        //     <p className="description">{balance.description}</p>
        // </div>
        <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">{balance.title}</h3>
          <p className="account-amount">${balance.amount}</p>
          <p className="account-amount-description">{balance.description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    );
};

export default BalancesCard;
