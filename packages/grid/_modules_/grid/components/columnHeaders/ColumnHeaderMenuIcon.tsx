import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { columnMenuStateSelector } from '../../hooks/features/columnMenu/columnMenuSelector';
import { GridState } from '../../hooks/features/core/gridState';
import { useGridSelector } from '../../hooks/features/core/useGridSelector';
import { useIcons } from '../../hooks/utils/useIcons';
import { classnames } from '../../utils/classnames';
import { ApiContext } from '../api-context';
import { ColDef } from '../../models/colDef/colDef';

export interface ColumnHeaderFilterIconProps {
  column: ColDef;
}

export const ColumnHeaderMenuIcon: React.FC<ColumnHeaderFilterIconProps> = ({ column }) => {
  const icons = useIcons();
  const apiRef = React.useContext(ApiContext);
  const columnMenuState = useGridSelector(apiRef, columnMenuStateSelector);
  const icon = React.createElement(icons.ColumnMenu!, { fontSize: 'small' });

  const menuIconClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const lastMenuState = apiRef!.current.getState<GridState>().columnMenu;
      if (!lastMenuState.open || lastMenuState.field !== column.field) {
        apiRef?.current.showColumnMenu(column.field);
      } else {
        apiRef?.current.hideColumnMenu();
      }
    },
    [apiRef, column.field],
  );

  const isOpen = columnMenuState.open && columnMenuState.field === column.field;
  return (
    <div className={classnames('MuiDataGrid-menuIcon', { 'MuiDataGrid-menuOpen': isOpen })}>
      <IconButton
        className={'MuiDataGrid-menuIconButton'}
        aria-label="Menu"
        size="small"
        onClick={menuIconClick}
      >
        {icon}
      </IconButton>
    </div>
  );
};
