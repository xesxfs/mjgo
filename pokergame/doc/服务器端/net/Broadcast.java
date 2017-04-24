package com.vequn.net;

import com.alibaba.fastjson.JSON;
import com.vequn.constat.Command;
import com.vequn.model.Cmd;
import com.vequn.model.PlayCardModel;
import com.vequn.model.Player;
import com.vequn.model.RoomId;
import com.vequn.model.RoomLevelModel;
import com.vequn.skpk.cardhand.Reminder;
import com.vequn.skpk.grade.Integral;
import com.vequn.skpk.player.DropLogin;
import com.vequn.skpk.player.PlayerManager;
import com.vequn.skpk.room.RoomManager;
import com.vequn.skpk.start.PlayPokers;
import com.vequn.skpk.utils.JOUtil;

import io.netty.channel.ChannelHandlerContext;

public class Broadcast {
	public static void broadcast(String message, ChannelHandlerContext current_ctx) {
		Cmd cmd = JSON.parseObject(message, Cmd.class);
		Object[] msgs = cmd.getMsg();
		switch (cmd.getCmd()) {
		case Command.CMD_1:	//-------->��¼
			Player player = (Player) JOUtil.toObject(msgs[0], Player.class);
			PlayerManager.playerLogin(player, current_ctx);
			break;
		case Command.CMD_3:	//-------->��������
			RoomLevelModel level2 = (RoomLevelModel) JOUtil.toObject(msgs[0], RoomLevelModel.class);
			RoomManager.createRoom(cmd, current_ctx, level2.getLevel());
			break;
		case Command.CMD_6:	//-------->���뷿��
			RoomId roomId = (RoomId) JOUtil.toObject(msgs[0], RoomId.class);
			RoomManager.joinRoom(roomId, cmd, current_ctx);
			break;
		case Command.CMD_9: //--------->�˳����䣬���������Ϣ
			RoomManager.roomOut(cmd, current_ctx);
			break;
		case Command.CMD_10:	//------->׼��
			RoomManager.ready(cmd, current_ctx);
			break;
		case Command.CMD_11:	//------->ȡ��׼��
			RoomManager.cancelReady(cmd, current_ctx);
			break;
		case Command.CMD_15: //--------->��ҵ������
			PlayCardModel playCardModel = (PlayCardModel) JOUtil.toObject(msgs[0], PlayCardModel.class);
			PlayPokers.play(playCardModel, current_ctx, cmd);
			break;
		case Command.CMD_16: //--------->��ҵ����ʾ
			Reminder.getReminder(current_ctx, cmd);
			break;
		case Command.CMD_18: //--------->��ҹ��ƣ����㲥
			PlayPokers.play(null, current_ctx, cmd);
			break;
		case Command.CMD_23: //--------->����ʱ����������
			PlayPokers.play(null, current_ctx, cmd);
			break;
		case Command.CMD_24: //-------->����ʱ�������������
			PlayPokers.mustSendCards(cmd, current_ctx);
			break;
		case Command.CMD_28: //--------->��ҵ��ֻ��ֽ���
			Integral.integralCalc(cmd, current_ctx);
			break;
		case Command.CMD_31: //--------->�����ɢ����
			RoomManager.roomOuts(current_ctx, cmd);
			break;
		case Command.CMD_32: //--------->ȷ�Ͻ�ɢ����
			RoomManager.confirmRoomOuts(current_ctx, cmd);
			break;
		case Command.CMD_36: //--------->����������ߣ�ȷ�ϻָ�����
			Player dropPlayer = (Player) JOUtil.toObject(msgs[0], Player.class);
			DropLogin.login(cmd, current_ctx, dropPlayer);
			break;
		case Command.CMD_37: //--------->��������Ϸδ��ʼǰ����������˳�����ѯ���Ƿ��ɢ����
			RoomManager.roomOut(cmd, current_ctx);
			break;
		case Command.CMD_38: //--------->��������Ϸδ��ʼǰ,����ȷ�Ͻ�ɢ����
			RoomManager.roomHostRoomOuts(current_ctx, cmd);
			break;
		default:
			break;
		}
	}
}
