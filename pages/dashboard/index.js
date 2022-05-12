import Head from "next/head";
import React from "react";
import {
  Dashboard,
  DashboardCTACard,
  RecentSale,
  BestSellingProduct,
} from "../../components/dashboard";
import { Card } from "../../components/common";
import { LineChart } from "../../components/charts";

export default function Home() {

  return (
    <div className="">
      <Head>
        <title>Asinyo Dashboard</title>
        <meta name="description" content="Asinyo Backend Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard>
        <div className="dashboard__top">
          <div className="s__row">
            <div className="s__col c--3">
              <Card>
                <DashboardCTACard
                  label="Customers"
                  value="300"
                  icon="pi-users"
                  iconColor="blue"
                  subValue="120"
                  subText="newly registered"
                />
              </Card>
            </div>
            <div className="s__col c--3">
              <Card>
                <DashboardCTACard
                  label="Supplier Merchants"
                  value="1522"
                  icon="pi-users"
                  iconColor="orange"
                  subValue="20"
                  subText="newly registered"
                />
              </Card>
            </div>
            <div className="s__col c--3">
              <Card>
                <DashboardCTACard
                  label="Retail Merchants"
                  value="1000"
                  icon="pi-users"
                  iconColor="seablue"
                  subValue="40"
                  subText="newly registered"
                />
              </Card>
            </div>
            <div className="s__col c--3">
              <Card>
                <DashboardCTACard
                  label="Agents"
                  value="152"
                  icon="pi-users"
                  iconColor="indigo"
                  subValue="12"
                  subText="newly registered"
                />
              </Card>
            </div>
          </div>
        </div>
        <div className="dashboard__main">
          <div className="s__row">
            <div className="s__col c--6">
              <div className="s__row">
                <div className="s__col c--12">
                  <Card label="Recent Sales">
                    <div className="recent__sales">
                      <RecentSale />
                    </div>
                  </Card>
                </div>
              </div>
              <div className="s__row">
                <div className="s__col c--12">
                  <Card label="best selling products">
                    <div className="best__selling__products">
                      <BestSellingProduct name='mango' category='fruits' value={59} color='green' />
                      <BestSellingProduct name='pepper' category='vegetables' value={73} color='indigo' />
                      <BestSellingProduct name='yam' category='root & tubers' value={65} color='orangered' />
                      <BestSellingProduct name='pear' category='fruits' value={10} color='blue' />
                      <BestSellingProduct name='cassava' category='root & tubers' value={93} color='brown' />
                      <BestSellingProduct name='maize' category='cereal' value={81} color='darkgoldenrod' />
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="s__col c--6">
              <div className="s__row">
                <div className="s__col c--6">
                  <Card>
                    <DashboardCTACard
                      label="Orders"
                      value="300"
                      icon="pi-shopping-cart"
                      iconColor="yellow"
                      subValue="120"
                      subText="since last visit"
                    />
                  </Card>
                </div>
                <div className="s__col c--6">
                  <Card>
                    <DashboardCTACard
                      label="Revenue"
                      value="GHS 2500"
                      icon="pi-briefcase"
                      iconColor="green"
                      subValue="%52+"
                      subText="since last week"
                    />
                  </Card>
                </div>
              </div>
              <div className="s__row">
                <div className="s__col c--12">
                  <Card label="Orders Overview">
                    <div className="line__chart">
                      <LineChart />
                    </div>
                  </Card>
                </div>
              </div>

              <div className="s__row">
                <div className="s__col c--12">
                  <Card label="Sales Overview">
                    <div className="line__chart">
                      <LineChart type="area" />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}
