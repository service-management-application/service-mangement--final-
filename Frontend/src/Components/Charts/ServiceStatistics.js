import React from "react";

export default function ServiceStatistics() {
  return (
    <div className="bg-light d-flex justify-content-center align-items-center">
      <div className="container py-5">
        <h2 className="text-center display-4 fw-bold text-dark">
          Our Service Statistics
        </h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 mt-4">
          <StatisticCard title="Total free servers" value="1.6M" />
          <StatisticCard title="Servers a month" value="19.2K" />
          <StatisticCard title="Servers a week" value="4.9K" />
          <StatisticCard title="Total users" value="166.7K" />
        </div>
      </div>
    </div>
  );
}

function StatisticCard({ title, value }) {
  return (
    <div className="col">
      <div className="card bg-white shadow-sm rounded">
        <div className="card-body">
          <p className="card-title text-muted mb-1">{title}</p>
          <h3 className="card-text text-primary fw-semibold">{value}</h3>
        </div>
      </div>
    </div>
  );
}
