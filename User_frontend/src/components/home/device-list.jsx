import { useTranslation } from "react-i18next"
import { useCustomer } from "@/context/customer-context"
import { DeviceCard } from "./device-card"

export function DeviceList({ onReport }) {
  const { t } = useTranslation()
  const { devices } = useCustomer()

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">{t("home.my_devices")}</h2>
        <span className="text-xs text-muted">{t("home.devices_connected", { count: devices.length })}</span>
      </div>
      <div className="space-y-3">
        {devices.map((device, i) => (
          <DeviceCard key={device.id} device={device} onReport={onReport} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}
