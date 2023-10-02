import { useCallback } from 'react';
import { useContextMenu } from 'renderer/contexts/ContextMenuProvider';
import useNewConnectionMenu from './useNewConnectionMenu';
import { ConnectionStoreItem } from 'drivers/base/SQLLikeConnection';
import { useConnectionList } from '.';

export default function useConnectionContextMenu({
  selectedItem,
  connectWithRecordUpdate,
}: {
  selectedItem?: ConnectionStoreItem;
  connectWithRecordUpdate: (config: ConnectionStoreItem) => void;
}) {
  const { storage, refresh, showEditConnection, setSelectedItem } =
    useConnectionList();
  const newConnectionMenu = useNewConnectionMenu();

  const onRemoveClick = useCallback(async () => {
    if (selectedItem) {
      const buttonIndex = await window.electron.showMessageBox({
        title: 'Do you want to remove?',
        message: `Do you want to remove ${selectedItem.name}?`,
        buttons: ['Yes', 'No'],
      });

      if (buttonIndex !== 0) return;

      storage.remove(selectedItem.id);
      refresh();
      setSelectedItem(undefined);
    }
  }, [selectedItem, storage, setSelectedItem]);

  const { handleContextMenu } = useContextMenu(() => {
    return [
      {
        text: 'Connect',
        disabled: !selectedItem,

        onClick: () => {
          if (selectedItem) {
            connectWithRecordUpdate(selectedItem);
          }
        },
      },
      {
        text: 'Refresh',
        separator: true,
        onClick: refresh,
      },
      {
        text: 'New Connection',
        children: newConnectionMenu,
      },
      {
        text: 'Edit Connection',
        onClick: () => {
          if (selectedItem) {
            showEditConnection(selectedItem);
          }
        },
        disabled: !selectedItem,
        separator: true,
      },
      {
        text: 'Remove',
        onClick: onRemoveClick,
        disabled: !selectedItem,
        destructive: true,
      },
    ];
  }, [
    newConnectionMenu,
    selectedItem,
    onRemoveClick,
    showEditConnection,
    connectWithRecordUpdate,
    refresh,
  ]);

  return { handleContextMenu };
}