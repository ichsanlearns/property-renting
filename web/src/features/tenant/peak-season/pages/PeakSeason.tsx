function PeakSeason() {
  return (
    <main className="flex-1 overflow-hidden mt-16 flex flex-col p-6 bg-surface-dim">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-on-surface tracking-tight">
            Pricing Rules
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Manage dynamic pricing adjustments across your portfolio.
          </p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span>
          New Rule
        </button>
      </div>
      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="w-full lg:w-[70%] bg-surface border border-outline rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface-container-low border-b border-outline text-on-surface-variant font-medium">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Scope &amp; Name</th>
                  <th className="px-6 py-4">Period</th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-1 group relative">
                      Priority
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant/70 cursor-help">
                        info
                      </span>
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-inverse-surface text-inverse-on-surface text-xs rounded shadow-lg z-10 whitespace-normal text-center">
                        Priority only applies within the same scope
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right">Adjustment</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline">
                <tr className="hover:bg-surface-variant transition-colors group border-l-4 border-l-primary relative">
                  <td className="px-6 py-4 pl-5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-tertiary-container text-on-tertiary-container border border-tertiary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          bed
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-base">
                          Penthouse VIP Discount
                        </p>
                        <p className="text-sm text-on-surface-variant mt-0.5 font-medium">
                          Room • Penthouse Suite
                        </p>
                        <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                          Overrides Property &amp; Global
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-on-surface font-medium">
                      May 1 - Sep 30
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      5 Months
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-container-high text-on-surface text-xs font-bold border border-outline">
                      1
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-error text-base">-10%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary-container/10">
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button className="text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-full hover:bg-error-container/50 ml-1">
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-variant transition-colors group">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary-container text-on-secondary-container border border-secondary/20">
                      <span className="material-symbols-outlined text-[14px]">
                        schedule
                      </span>
                      Upcoming
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface">
                        <span className="material-symbols-outlined">
                          apartment
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface/90 text-base">
                          Oceanview Weekend Premium
                        </p>
                        <p className="text-sm text-on-surface-variant mt-0.5">
                          Property • Oceanview Villa
                        </p>
                        <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                          Overrides Global
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-on-surface font-medium">Jul 4 - Jul 7</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      4 Days
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-container-high text-on-surface text-xs font-bold border border-outline">
                      1
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-tertiary text-base">
                      +$50
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary-container/10">
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button className="text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-full hover:bg-error-container/50 ml-1">
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-variant transition-colors group">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-tertiary-container text-on-tertiary-container border border-tertiary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center text-on-surface-variant">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          public
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface/80 text-base">
                          Summer Base Rate 2024
                        </p>
                        <p className="text-sm text-on-surface-variant mt-0.5">
                          Global Level
                        </p>
                        <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                          Fallback rule
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-on-surface/90 font-medium">
                      Jun 1 - Aug 31
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      3 Months
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-container-high text-on-surface text-xs font-bold border border-outline">
                      1
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-tertiary text-base">
                      +15%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary-container/10">
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button className="text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-full hover:bg-error-container/50 ml-1">
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-3 bg-surface rounded-xl shadow-sm border border-outline flex flex-col overflow-hidden">
          <div className="p-5 border-b border-outline bg-surface-container-lowest flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Edit Rule</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Oceanview Weekend Premium
              </p>
            </div>
            <button className="text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-on-surface">
                  Status
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    checked
                    className="sr-only peer"
                    type="checkbox"
                    value=""
                  />
                  <div className="w-9 h-5 bg-outline peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-2 text-sm font-medium text-on-surface-variant">
                    Active
                  </span>
                </label>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                  Rule Name
                </label>
                <input
                  className="w-full px-3 py-2 bg-surface border border-outline rounded-md text-sm text-on-surface font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  type="text"
                  value="Oceanview Weekend Premium"
                />
              </div>
            </div>
            <hr className="border-outline" />
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">
                  target
                </span>
                Scope Settings
              </h4>
              <div className="flex bg-surface-variant p-1 rounded-lg">
                <button className="flex-1 py-1.5 text-xs font-medium text-on-surface-variant rounded-md hover:text-on-surface transition-colors">
                  Global
                </button>
                <button className="flex-1 py-1.5 text-xs font-bold bg-surface text-primary shadow-sm rounded-md transition-colors">
                  Property
                </button>
                <button className="flex-1 py-1.5 text-xs font-medium text-on-surface-variant rounded-md hover:text-on-surface transition-colors">
                  Unit Type
                </button>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                  Target Property
                </label>
                <select className="w-full px-3 py-2 bg-surface border border-outline rounded-md text-sm text-on-surface font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                  <option>Oceanview Resort</option>
                  <option>City Center Lofts</option>
                  <option>Mountain Retreat</option>
                </select>
              </div>
            </div>
            <hr className="border-outline" />
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">
                  functions
                </span>
                Rule Logic
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Priority
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-surface border border-outline rounded-md text-sm text-on-surface font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    type="number"
                    value="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Adjustment (%)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary font-bold">
                      +
                    </span>
                    <input
                      className="w-full pl-7 pr-3 py-2 bg-surface border border-outline rounded-md text-sm text-on-surface font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      type="number"
                      value="15"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                  Date Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    className="w-full px-3 py-2 bg-surface border border-outline rounded-md text-sm text-on-surface font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    type="text"
                    value="Jun 01, 2024"
                  />
                  <span className="text-on-surface-variant text-sm">to</span>
                  <input
                    className="w-full px-3 py-2 bg-surface border border-outline rounded-md text-sm text-on-surface font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    type="text"
                    value="Aug 31, 2024"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-outline bg-surface-container-lowest flex gap-3">
            <button className="flex-1 py-2 px-4 border border-outline text-on-surface font-medium rounded-lg hover:bg-surface-variant transition-colors text-sm">
              Cancel
            </button>
            <button className="flex-1 py-2 px-4 bg-primary text-on-primary font-medium rounded-lg shadow-sm hover:bg-primary/90 transition-colors text-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PeakSeason;
