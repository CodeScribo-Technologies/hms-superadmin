import { Modal, Button } from "antd";
import { useTranslation } from "react-i18next";

interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={visible}
      transitionName=""
      onOk={onConfirm}
      onCancel={onCancel}
      centered
      width={470}
      footer={null}
      closable={false}>
      <div className="text-left">
        <h1 className="text-3xl font-semibold mt-4">
          {t("confirmModal.title")}
        </h1>
        <p className="text-gray-500 mt-2">{t("confirmModal.description")}</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-300 text-white">
            {t("commonText.cancel")}
          </Button>

          <Button
            color="danger"
            variant="solid"
            onClick={onConfirm}
            className="text-white">
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
