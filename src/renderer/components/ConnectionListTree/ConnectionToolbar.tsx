import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toolbar from 'renderer/components/Toolbar';
import useNewConnectionMenu from './useNewConnectionMenu';

export default function ConnectionToolbar() {
  const menu = useNewConnectionMenu();

  return (
    <Toolbar>
      <Toolbar.ContextMenu
        icon={<FontAwesomeIcon icon={faAdd} />}
        text=""
        items={menu}
      />
    </Toolbar>
  );
}
