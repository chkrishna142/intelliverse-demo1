<Tabs>
        <TabList className="!flex !border-2 h-11 rounded-xl  ">
          <div className="flex items-center gap-4">
            <Tab
              className={
                page === "StabilityIndicator"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("StabilityIndicator")}
            >
              Stability Indicator
            </Tab>
            {/* <Tab
              className={
                page === "RCA"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("RCA")}
            >
              RCA
            </Tab> */}
            <Tab
              className={
                page === "ThermalIndicator"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("ThermalIndicator")}
            >
              Thermal Indicator
            </Tab>

            <Tab
              className={
                page === "Recommendations"
                  ? "!text-black !text-xs sm:!text-sm !bg-white rounded-full pl-4 pr-4 pt-1 pb-1 !border-0"
                  : "!text-xs sm:!text-sm !text-[#938F96] !border-0"
              }
              onClick={() => setPage("Recommendations")}
            >
              Recommendations
            </Tab>
          </div>
        </TabList>

        <TabPanels>
          <TabPanel className=" flex flex-col !pl-0 !pr-0 gap-3">
            <StabilityInd
              isExpanded1={isExpanded1}
              handleToggle1={handleToggle1}
            />
            <Rca isExpanded2={isExpanded2} handleToggle2={handleToggle2} series={series} options={options}/>
          </TabPanel>

          <TabPanel className=" flex flex-col !pl-0 !pr-0 gap-3">
            <ThermalIndicator
              isExpanded3={isExpanded3}
              handleToggle3={handleToggle3}
            />
            <Rca isExpanded2={isExpanded2} handleToggle2={handleToggle2} series={series} options={options}/>
          </TabPanel>
          <TabPanel className="!pl-0 !pr-0">
            <Recommendations
              isExpanded4={isExpanded4}
              handleToggle4={handleToggle4}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>